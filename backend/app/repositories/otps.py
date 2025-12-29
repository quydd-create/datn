from app.models import Otps
from sqlalchemy.orm import Session


class OtpRepository:
    """Repository for OTP operations."""

    def __init__(self, db: Session):
        self.db = db

    def save(self, otp: Otps) -> Otps:
        """
        Create a new OTP if id is not existed or
        update a OTP if id is existed to the database.
        """
        if otp.otp_id is None:
            self.db.add(otp)
        else:
            self.db.merge(otp)
        self.db.flush()
        return otp
    
    def find_by_email(self, email: str) -> Otps | None:
        """Find an OTP by email."""
        return (
            self.db.query(Otps)
            .filter(
                Otps.otp_email == email,
            )
            .first()
        )

    def find_by_email_and_code(self, email: str, code: str) -> Otps | None:
        """Find an OTP by email and code that is not used yet."""
        return (
            self.db.query(Otps)
            .filter(
                Otps.otp_email == email,
                Otps.otp_code == code,
            )
            .first()
        )
