import random
from sqlalchemy.orm import Session
from app.models.Otps import Otps
from app.repositories import OtpRepository, UserRepository
from app.utils import mail
from fastapi import HTTPException, status
from datetime import datetime, timedelta


class OtpService:
    """Service for OTP operations."""

    def __init__(self, db: Session):
        self.db = db
        self.otp_repository = OtpRepository(db)
        self.user_repository = UserRepository(db)

    async def generate_otp(self, email: str, is_forget_password: bool) -> str:
        """[SERVICE] Generate a new OTP."""
        try:

            # If OTP is for password recovery, check if the email exists
            if is_forget_password:
                exist_user_otp = self.user_repository.find_by_email(email)
                if not exist_user_otp:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Email is not registered.",
                    )

            otp_code = str(random.randint(100000, 999999))
            new_otp = self.otp_repository.find_by_email(email)
            if new_otp:
                new_otp.otp_code = otp_code
                new_otp.otp_created_at = datetime.utcnow()
                new_otp.otp_expires_at = datetime.utcnow() + timedelta(minutes=5)
                new_otp.otp_is_verified = False
            else:
                new_otp = Otps(
                    otp_code=otp_code,
                    otp_email=email,
                )
            self.otp_repository.save(new_otp)
            self.db.commit()

            await mail.send_simple_email(
                subject="Your OTP Code",
                recipients=[email],
                body=f"Your OTP code is: {otp_code}",
            )
            return otp_code
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def verify_otp(self, email: str, code: str) -> bool:
        """[SERVICE] Verify an OTP."""
        try:
            otp_record = self.otp_repository.find_by_email_and_code(email, code)
            now = datetime.utcnow()
            if (
                otp_record
                and otp_record.otp_expires_at > now
                and otp_record.otp_is_verified == False
            ):
                otp_record.otp_is_verified = True
                otp_record.otp_expires_at = now + timedelta(minutes=5)
                self.otp_repository.save(otp_record)
                self.db.commit()
                return True
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP.",
            )
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )
