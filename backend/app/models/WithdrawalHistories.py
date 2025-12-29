from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from .Base import Base
from datetime import datetime


class WithdrawalHistories(Base):
    __tablename__ = "withdrawal_histories"

    withdrawal_history_id = Column(Integer, primary_key=True, autoincrement=True)
    withdrawal_history_seller_id = Column(
        Integer, ForeignKey("sellers.user_id", name="fk_withdrawal_histories_seller_id"), nullable=False
    )
    withdrawal_history_amount = Column(DECIMAL(10, 2), nullable=False)
    withdrawal_history_created_at = Column(DateTime, default=datetime.utcnow)
    withdrawal_history_method_bin = Column(String(50), nullable=True)

    seller = relationship("Sellers", back_populates="withdrawal_histories")
