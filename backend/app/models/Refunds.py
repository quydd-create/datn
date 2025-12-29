from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .Base import Base


class Refunds(Base):
    __tablename__ = "refunds"

    refund_id = Column(Integer, primary_key=True, autoincrement=True)
    refund_sub_order_id = Column(Integer, ForeignKey("sub_orders.sub_order_id", name="fk_refunds_sub_order_id"), nullable=False)
    refund_reason = Column(Text, nullable=False)
    refund_status = Column(
        Enum("pending", "approved", "rejected", "processed", name="refund_status_enum"),
        nullable=False,
        default="pending",
        index=True,
    )
    refund_created_at = Column(DateTime, default=datetime.utcnow)

    sub_order = relationship("SubOrders", back_populates="refund")
