from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class OrderItems(Base):
    __tablename__ = "order_items"

    order_item_sub_order_id = Column(
        Integer, ForeignKey("sub_orders.sub_order_id", name="fk_order_items_sub_order_id"), primary_key=True
    )
    order_item_product_id = Column(
        Integer, ForeignKey("products.product_id", name="fk_order_items_product_id"), primary_key=True
    )
    order_item_quantity = Column(Integer, nullable=False, default=1)

    sub_order = relationship("SubOrders", back_populates="order_items")
    product = relationship("Products", back_populates="order_items")
