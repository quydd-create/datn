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


class Orders(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_orders_buyer_id"), nullable=False)
    order_total_amount = Column(DECIMAL(10, 2), nullable=False)
    order_created_at = Column(DateTime, default=datetime.utcnow)
    order_used_point = Column(Integer, nullable=True)
    order_code = Column(String(100), unique=True, nullable=False)
    order_note = Column(String(255), nullable=True)
    order_address_id = Column(Integer, ForeignKey("addresses.address_id", name="fk_orders_address_id"), nullable=False)

    accumulate_points = relationship("AccumulatePoints", back_populates="order")
    address = relationship("Addresses", back_populates="orders")
    buyer = relationship("Buyers", back_populates="orders")
    payment = relationship("Payments", back_populates="order", uselist=False)
    vouchers = relationship("VoucherOrders", back_populates="order")
    sub_orders = relationship("SubOrders", back_populates="order")