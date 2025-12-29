from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .Base import Base


class Payments(Base):
    __tablename__ = "payments"

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    payment_order_id = Column(Integer, ForeignKey("orders.order_id", name="fk_payments_order_id"), nullable=False)
    payment_amount = Column(DECIMAL(10, 2), nullable=False)
    payment_method_name = Column(String(50), nullable=False)
    payment_status = Column(
        Enum("pending", "completed", "failed", "refunded", name="payment_status_enum"),
        nullable=False,
        default="pending",
        index=True,
    )
    payment_trans_id = Column(String(100), nullable=True)
    payment_created_at = Column(DateTime, default=datetime.utcnow)
    payment_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    order = relationship("Orders", back_populates="payment")