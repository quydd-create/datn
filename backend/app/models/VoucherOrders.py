from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class VoucherOrders(Base):
    __tablename__ = "voucher_orders"

    voucher_order_voucher_id = Column(
        Integer, ForeignKey("vouchers.voucher_id", name="fk_voucher_orders_voucher_id"), primary_key=True
    )
    voucher_order_order_id = Column(
        Integer, ForeignKey("orders.order_id", name="fk_voucher_orders_order_id"), primary_key=True
    )

    order = relationship("Orders", back_populates="vouchers")
    voucher = relationship("Vouchers", back_populates="orders")
