from sqlalchemy.orm import Session
from app.repositories import UserRepository, SellersRepository, BuyersRepository
from fastapi import HTTPException, status, UploadFile
from app.utils import jwt
from app.models import Users
from app.schemas import (
    UserProfileResponse,
    SellerProfileResponse,
    BuyerProfileResponse,
    Address,
    BuyerAndSellerProfileReponse,
)
from app.enums import RoleMiddleware
import os
from app.core.config import settings
from app.schemas.User import UserProfileRequest


if not os.path.exists(settings.UPLOAD_FOLDER):
    os.makedirs(settings.UPLOAD_FOLDER)


class UserService:
    """Service for User operations."""

    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)
        self.seller_repository = SellersRepository(db)
        self.buyer_repository = BuyersRepository(db)

    def get_current_user(self, token: str) -> UserProfileResponse:
        """[SERVICE] Get current user info."""
        try:
            user = self.get_user_by_token(token=token)
            seller = self.seller_repository.find_by_user_id(user.user_id)
            buyer = self.buyer_repository.find_by_user_id(user.user_id)
            if seller and buyer:
                return BuyerAndSellerProfileReponse(
                    id=user.user_id,
                    email=user.user_email,
                    first_name=user.user_first_name,
                    last_name=user.user_last_name,
                    phone_number=user.user_phone_number,
                    gender=user.user_gender,
                    dob=user.user_dob.isoformat() if user.user_dob else None,
                    bin=seller.receive_method_bin,
                    banknum=seller.receive_method_banknum,
                    name=seller.receive_method_name,
                    available_balance=seller.seller_available_balance,
                    avatar_url=user.user_avatar_url,
                    roles=[
                        RoleMiddleware.BUYER.value,
                        RoleMiddleware.SELLER.value,
                    ],
                    addresses=[
                        Address(
                            id=address.address_id,
                            ward=address.address_ward,
                            district=address.address_district,
                            description=address.address_description,
                            is_default=address.address_is_default,
                        )
                        for address in buyer.addresses
                    ],
                    point=buyer.buyer_point,
                )

            if seller:
                return SellerProfileResponse(
                    id=user.user_id,
                    email=user.user_email,
                    first_name=user.user_first_name,
                    last_name=user.user_last_name,
                    phone_number=user.user_phone_number,
                    gender=user.user_gender,
                    dob=user.user_dob.isoformat() if user.user_dob else None,
                    bin=seller.receive_method_bin,
                    banknum=seller.receive_method_banknum,
                    name=seller.receive_method_name,
                    available_balance=seller.seller_available_balance,
                    avatar_url=user.user_avatar_url,
                    roles=[RoleMiddleware.SELLER.value],
                )
            if buyer:
                return BuyerProfileResponse(
                    id=user.user_id,
                    email=user.user_email,
                    first_name=user.user_first_name,
                    last_name=user.user_last_name,
                    phone_number=user.user_phone_number,
                    avatar_url=user.user_avatar_url,
                    gender=user.user_gender,
                    dob=user.user_dob.isoformat() if user.user_dob else None,
                    roles=[RoleMiddleware.BUYER.value],
                    addresses=[
                        Address(
                            id=address.address_id,
                            ward=address.address_ward,
                            district=address.address_district,
                            description=address.address_description,
                            is_default=address.address_is_default,
                        )
                        for address in buyer.addresses
                    ],
                    point=buyer.buyer_point,
                )

            return UserProfileResponse(
                id=user.user_id,
                email=user.user_email,
                first_name=user.user_first_name,
                last_name=user.user_last_name,
                phone_number=user.user_phone_number,
                gender=user.user_gender,
                dob=user.user_dob.isoformat() if user.user_dob else None,
                avatar_url=user.user_avatar_url,
                roles=[],
            )
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def get_user_by_token(self, token: str) -> Users:
        """[SERVICE] Get user by token."""
        payload = jwt.decode_token(token=token)

        user = self.user_repository.find_by_id(user_id=payload.get("user_id"))
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials.",
            )
        return user

    def update_avatar(self, token: str, avatar_file: UploadFile) -> str:
        """[SERVICE] Update user avatar."""
        try:
            # Check file constraints
            allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
            if avatar_file.content_type not in allowed_types:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid file type. Allowed: jpg, png, webp, jpeg",
                )

            # Check file size (max 2MB)
            content = avatar_file.file.read()
            if len(content) > settings.MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"File size exceeds limit (max 2MB)",
                )
            # reset file pointer
            avatar_file.file.seek(0)

            user = self.get_user_by_token(token=token)

            # Save the uploaded file
            file_extension = os.path.splitext(avatar_file.filename)[1]
            avatar_filename = f"user_{user.user_id}_avatar{file_extension}"
            avatar_path = os.path.join(settings.UPLOAD_FOLDER, avatar_filename)
            with open(avatar_path, "wb") as buffer:
                buffer.write(avatar_file.file.read())
            avatar_url = f"/{settings.UPLOAD_FOLDER}/{avatar_filename}"

            # Update user's avatar URL in the database
            user.user_avatar_url = avatar_url
            self.user_repository.save(user)
            self.db.commit()

            return avatar_url
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def update_profile(self, token: str, profile_data: UserProfileRequest) -> str:
        """[SERVICE] Update user profile."""
        try:
            user = self.get_user_by_token(token=token)
            user.user_first_name = profile_data.first_name
            user.user_last_name = profile_data.last_name
            user.user_gender = profile_data.gender
            user.user_dob = profile_data.dob
            self.user_repository.save(user)
            self.db.commit()
            return {"message": "Profile updated successfully."}
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )