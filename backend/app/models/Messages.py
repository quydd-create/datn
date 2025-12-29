from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base
from datetime import datetime


class Messages(Base):
    __tablename__ = "messages"

    message_id = Column(Integer, primary_key=True, autoincrement=True)
    message_ref_type = Column(String(50), nullable=False, index=True)
    message_ref_id = Column(Integer, nullable=False, index=True)
    message_content = Column(Text, nullable=False)
    message_is_read = Column(Boolean, default=False, nullable=False)
    message_created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    message_updated_at = Column(
        DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    message_receiver_id = Column(Integer, ForeignKey("users.user_id", name="fk_messages_receiver_id"), nullable=False)
    message_sender_id = Column(Integer, ForeignKey("users.user_id", name="fk_messages_sender_id"), nullable=False)
    message_replied_to_id = Column(
        Integer, ForeignKey("messages.message_id", name="fk_messages_replied_to_id"), nullable=True
    )

    receiver = relationship(
        "Users", foreign_keys=[message_receiver_id], back_populates="messages"
    )
    sender = relationship(
        "Users", foreign_keys=[message_sender_id], back_populates="sent_messages"
    )

    replied_to = relationship(
        "Messages", remote_side=[message_id], back_populates="replies"
    )
    replies = relationship("Messages", back_populates="replied_to")
