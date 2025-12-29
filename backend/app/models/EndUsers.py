from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class EndUsers(Base):
    __tablename__ = "end_users"

    user_id = Column(Integer, ForeignKey("users.user_id", name="fk_end_users_user_id"), primary_key=True)

    user = relationship("Users", back_populates="end_user")
    buyer = relationship("Buyers", back_populates="end_user", uselist=False)
    seller = relationship("Sellers", back_populates="end_user", uselist=False)
    tickets = relationship("Tickets", back_populates="end_user")
    offer_requests = relationship("OfferRequests", back_populates="end_user")