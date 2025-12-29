from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from .Base import Base
from sqlalchemy.orm import relationship
from datetime import datetime


class Logs(Base):
    __tablename__ = "logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    log_description = Column(Text, nullable=True)
    log_timestamp = Column(DateTime, default=datetime.utcnow)
    log_user_id = Column(Integer, ForeignKey("users.user_id", name="fk_logs_user_id"), nullable=False)
    log_ref_type = Column(
        String(50), nullable=False, index=True
    )  # e.g., 'order', 'message'
    log_ref_id = Column(Integer, nullable=False, index=True)

    user = relationship("Users", back_populates="logs")
