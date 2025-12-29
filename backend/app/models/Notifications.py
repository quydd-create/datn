from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from .Base import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Notifications(Base):
    __tablename__ = "notifications"

    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    notification_title = Column(String(100), nullable=False)
    notification_message = Column(Text, nullable=False)
    notification_created_at = Column(DateTime, default=datetime.utcnow)
    notification_ref_type = Column(
        String(50), nullable=False, index=True
    )  # e.g., 'order', 'message'
    notification_ref_id = Column(Integer, nullable=False, index=True)
    notification_status = Column(
        Enum("active", "inactive", name="notification_status_enum"),
        nullable=False,
        default="active",
        index=True,
    )

    users = relationship("HasNotifications", back_populates="notification")
