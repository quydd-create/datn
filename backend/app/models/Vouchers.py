from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from .Base import Base


class Vouchers(Base):
    __tablename__ = "vouchers"

    voucher_id = Column(Integer, primary_key=True, autoincrement=True)
    voucher_code = Column(String(50), unique=True, nullable=False)
    voucher_remaining_quantity = Column(Integer, nullable=False)
    voucher_end_date = Column(DateTime, nullable=False)
    voucher_start_date = Column(DateTime, nullable=False)
    voucher_total_quantity = Column(Integer, nullable=False)
    voucher_description = Column(Text, nullable=True)
    voucher_discount_type = Column(
        Enum("percentage", "fixed_amount", name="voucher_discount_type_enum"),
        nullable=False,
        default="fixed_amount",
        index=True,
    )
    voucher_discount_value = Column(Integer, nullable=False)
    voucher_min_order_value = Column(Integer, nullable=True)
    voucher_max_discount_value = Column(Integer, nullable=True)
    voucher_ref_type = Column(String(100), nullable=True, index=True)
    voucher_ref_id = Column(Integer, nullable=True, index=True)
    voucher_name = Column(String(100), nullable=False)
    voucher_use_max = Column(Integer, nullable=True)
    voucher_seller_id = Column(Integer, ForeignKey("sellers.user_id", name="fk_vouchers_seller_id"), nullable=False)

    buyers = relationship("BuyerVouchers", back_populates="voucher")
    seller = relationship("Sellers", back_populates="vouchers")
    orders = relationship("VoucherOrders", back_populates="voucher")
    sub_orders = relationship("SubOrders", back_populates="voucher")