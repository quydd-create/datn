from sqlalchemy import Column, Integer, String, DateTime, Boolean, UniqueConstraint
from datetime import datetime
from .Base import Base
from datetime import timedelta


class Otps(Base):
    __tablename__ = "otps"

    otp_id = Column(Integer, primary_key=True, autoincrement=True)
    otp_code = Column(String(10), nullable=False)
    otp_email = Column(String(100), nullable=False)
    otp_created_at = Column(DateTime, default=datetime.utcnow)
    otp_expires_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.utcnow() + timedelta(minutes=5),
    )
    otp_is_verified = Column(Boolean, default=False)
    
    __table_args__ = (
        UniqueConstraint("otp_email", name="uq_otps_email"),
    )
