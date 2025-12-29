from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship
from .Base import Base


class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_email = Column(String(100), unique=True, nullable=True)
    user_password = Column(String(255), nullable=False)
    user_first_name = Column(String(100), nullable=True)
    user_last_name = Column(String(100), nullable=True)
    user_gender = Column(
        Enum("male", "female", "other", name="user_gender_enum"), nullable=True
    )
    user_dob = Column(DateTime, nullable=True)
    user_status = Column(
        Enum("active", "inactive", "banned", name="user_status_enum"),
        nullable=False,
        default="active",
        index=True,
    )
    user_phone_number = Column(String(15), unique=True, nullable=False)
    user_avatar_url = Column(String(255), nullable=True)

    sent_messages = relationship(
        "Messages", back_populates="sender", foreign_keys="[Messages.message_sender_id]"
    )

    messages = relationship(
        "Messages",
        back_populates="receiver",
        foreign_keys="[Messages.message_receiver_id]",
    )

    admin = relationship("Admins", back_populates="user", uselist=False)
    end_user = relationship("EndUsers", back_populates="user", uselist=False)
    notifications = relationship("HasNotifications", back_populates="user")
    logs = relationship("Logs", back_populates="user")
