from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class ShoppingCarts(Base):
    __tablename__ = "shopping_carts"

    shopping_cart_buyer_id = Column(
        Integer, ForeignKey("buyers.user_id", name="fk_shopping_carts_buyer_id"), primary_key=True
    )
    shopping_cart_product_id = Column(
        Integer, ForeignKey("products.product_id", name="fk_shopping_carts_product_id"), primary_key=True
    )
    shopping_cart_quantity = Column(Integer, nullable=False, default=1)

    buyer = relationship("Buyers", back_populates="shopping_carts")
    product = relationship("Products", back_populates="shopping_carts")