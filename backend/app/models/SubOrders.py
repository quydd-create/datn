from sqlalchemy import (
    Column,
    Integer,
    Index,
    String,
    ForeignKey,
    Enum,
    DateTime,
    DECIMAL,
)
from sqlalchemy.orm import relationship
from .Base import Base
from datetime import datetime


class SubOrders(Base):
    __tablename__ = "sub_orders"

    sub_order_id = Column(Integer, primary_key=True, autoincrement=True)
    sub_order_total_amount = Column(DECIMAL(10, 2), nullable=False)
    sub_order_status = Column(
        Enum(
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
            "returned",
            name="order_status_enum",
        ),
        nullable=False,
        default="pending",
        index=True,
    )
    sub_order_order_id = Column(Integer, ForeignKey("orders.order_id", name="fk_sub_orders_order_id"), nullable=True)
    sub_order_voucher_id = Column(Integer, ForeignKey("vouchers.voucher_id", name="fk_sub_orders_voucher_id"), nullable=True)

    bid = relationship("Bids", back_populates="sub_order", uselist=False)
    offer_requests = relationship("OfferRequests", back_populates="sub_order")
    order_items = relationship("OrderItems", back_populates="sub_order")
    order = relationship("Orders", back_populates="sub_orders")
    refund = relationship("Refunds", back_populates="sub_order", uselist=False)
    shipments = relationship("Shipments", back_populates="sub_order")
    voucher = relationship("Vouchers", back_populates="sub_orders")