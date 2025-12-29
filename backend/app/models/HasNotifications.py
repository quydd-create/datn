from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .Base import Base


class HasNotifications(Base):
    __tablename__ = "has_notifications"

    notification_id = Column(
        Integer, ForeignKey("notifications.notification_id", name="fk_has_notifications_notif_id"), primary_key=True
    )
    notification_user_id = Column(
        Integer, ForeignKey("users.user_id", name="fk_has_notifications_user_id"), primary_key=True
    )
    notification_read_at = Column(DateTime, nullable=True, default=datetime.utcnow)

    notification = relationship("Notifications", back_populates="users")
    user = relationship("Users", back_populates="notifications")
