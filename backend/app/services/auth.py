from app.schemas import UserRegister
from sqlalchemy.orm import Session
from app.repositories import (
    UserRepository,
    BuyersRepository,
    SellersRepository,
    EndUsersRepository,
    AdminsRepository,
    BlacklistTokensRepository,
    OtpRepository,
)
from fastapi import HTTPException, status
from passlib.hash import bcrypt
from app.models import Buyers, EndUsers, BlacklistTokens
from app.schemas import (
    UserLoginRequest,
    UserLoginResponse,
    UserInfo,
    UserForgetPassword,
)
from app.utils import jwt
from datetime import datetime


class AuthService:
    """Service for authentication operations."""

    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)
        self.buyer_repository = BuyersRepository(db)
        self.seller_repository = SellersRepository(db)
        self.end_user_repository = EndUsersRepository(db)
        self.admin_repository = AdminsRepository(db)
        self.bt_repository = BlacklistTokensRepository(db)
        self.otp_repository = OtpRepository(db)

    def hash_password(self, plain_password: str) -> str:
        """Hash password before saving to database."""
        return bcrypt.hash(plain_password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against the hashed password."""
        return bcrypt.verify(plain_password, hashed_password)

    def register(
        self,
        user: UserRegister,
    ) -> bool:
        """[SERVICE] Register a new user."""
        try:
            if user.password != user.confirm_password:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Passwords do not match.",
                )

            if self.user_repository.find_by_email(user.email):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email is already registered.",
                )

            if self.user_repository.find_by_phone_number(user.phone_number):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Phone number is already registered.",
                )

            otp_record = self.otp_repository.find_by_email_and_code(
                email=user.email, code=user.otp_code
            )

            now = datetime.utcnow()
            if (
                otp_record is None
                or otp_record.otp_is_verified is False
                or otp_record.otp_expires_at < now
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid or unverified OTP code.",
                )

            user.password = self.hash_password(user.password)
            user.gender = user.gender.value
            new_user = user.to_orm()
            self.user_repository.save(new_user)

            end_user = self.end_user_repository.save(EndUsers(user_id=new_user.user_id))

            self.buyer_repository.save(Buyers(user_id=end_user.user_id))
            self.db.commit()
            return True
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def login(
        self,
        login_request: UserLoginRequest,
    ) -> UserLoginResponse:
        """[SERVICE] User login."""
        try:
            user = self.user_repository.find_by_email(login_request.email)
            if not user or not self.verify_password(
                login_request.password, user.user_password
            ):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid email or password.",
                )

            roles = self.get_roles(user.user_id)
            access_token = jwt.create_access_token(
                data={"user_id": str(user.user_id), "roles": roles}
            )

            return UserLoginResponse(
                access_token=access_token,
            )
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def get_roles(self, user_id: int) -> list[str]:
        """Get roles of a user by user_id."""
        roles = []
        if self.seller_repository.find_by_user_id(user_id):
            roles.append("seller")
        if self.buyer_repository.find_by_user_id(user_id):
            roles.append("buyer")
        if self.admin_repository.find_by_user_id(user_id):
            roles.append("admin")
        return roles

    def logout(self, token: str) -> bool:
        """[SERVICE] User logout."""
        try:
            token_obj = BlacklistTokens(bt_token=token)
            self.bt_repository.save(token_obj)
            self.db.commit()
            return True
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def change_password(self, request: UserForgetPassword) -> bool:
        """[SERVICE] Change password."""
        try:
            user = self.user_repository.find_by_email(request.email)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Email not found.",
                )

            otp_record = self.otp_repository.find_by_email_and_code(
                email=request.email, code=request.otp_code
            )

            now = datetime.utcnow()
            if (
                otp_record is None
                or otp_record.otp_is_verified is False
                or otp_record.otp_expires_at < now
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid or unverified OTP code.",
                )

            if request.password != request.confirm_password:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Passwords do not match.",
                )

            new_hashed_password = self.hash_password(request.password)
            user.user_password = new_hashed_password
            self.user_repository.save(user)
            self.db.commit()
            return True
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )
