from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from .Base import Base


class BuyerVouchers(Base):
    __tablename__ = "buyer_vouchers"

    buyer_voucher_voucher_id = Column(
        Integer, ForeignKey("vouchers.voucher_id", name="fk_buyer_vouchers_voucher_id"), primary_key=True
    )
    buyer_voucher_buyer_id = Column(
        Integer, ForeignKey("buyers.user_id", name="fk_buyer_vouchers_buyer_id"), primary_key=True
    )
    buyer_voucher_used_at = Column(DateTime, nullable=True)
    buyer_voucher_count = Column(Integer, default=0, nullable=False)

    buyer = relationship("Buyers", back_populates="vouchers")
    voucher = relationship("Vouchers", back_populates="buyers")