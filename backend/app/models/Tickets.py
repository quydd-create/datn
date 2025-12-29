from .Base import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime


class Tickets(Base):
    __tablename__ = "tickets"

    ticket_id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_title = Column(String(255), nullable=False)
    ticket_description = Column(Text, nullable=True)
    ticket_status = Column(
        Enum("open", "in_progress", "resolved", "closed", name="ticket_status_enum"),
        nullable=False,
        default="open",
        index=True,
    )
    ticket_created_at = Column(DateTime, default=datetime.utcnow)
    ticket_updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    ticket_category = Column(String(100), nullable=True)
    ticket_rate = Column(Integer, nullable=True)
    ticket_end_user_id = Column(
        Integer, ForeignKey("end_users.user_id", name="fk_tickets_end_user_id"), nullable=False
    )
    ticket_admin_id = Column(Integer, ForeignKey("admins.user_id", name="fk_tickets_admin_id"), nullable=True)

    admin = relationship("Admins", back_populates="tickets")
    end_user = relationship("EndUsers", back_populates="tickets")