from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum, DECIMAL, String
from sqlalchemy.orm import relationship
from .Base import Base
from datetime import datetime


class OfferRequests(Base):
    __tablename__ = "offer_requests"

    offer_request_id = Column(Integer, primary_key=True, autoincrement=True)
    offer_request_sub_order_id = Column(
        Integer, ForeignKey("sub_orders.sub_order_id", name="fk_offer_requests_sub_order_id"), nullable=False
    )
    offer_request_price = Column(DECIMAL(10, 2), nullable=False)
    offer_request_status = Column(
        Enum("pending", "accepted", "rejected", name="offer_request_status_enum"),
        nullable=False,
        default="pending",
        index=True,
    )
    offer_request_note = Column(String(255), nullable=True)
    offer_request_created_at = Column(DateTime, default=datetime.utcnow)
    offer_request_end_user_id = Column(
        Integer, ForeignKey("end_users.user_id", name="fk_offer_requests_end_user_id"), nullable=False
    )
    offer_request_sub_order_id = Column(
        Integer, ForeignKey("sub_orders.sub_order_id", name="fk_offer_requests_sub_order_id"), nullable=False
    )
    offer_request_sub_id = Column(
        Integer, ForeignKey("offer_requests.offer_request_id", name="fk_offer_requests_sub_id"), nullable=False
    )
    
    end_user = relationship("EndUsers", back_populates="offer_requests")
    sub_order = relationship("SubOrders", back_populates="offer_requests")
    parent_request = relationship(
        "OfferRequests", remote_side=[offer_request_id], back_populates="child_request"
    )
    child_request = relationship(
        "OfferRequests", back_populates="parent_request", uselist=False
    )