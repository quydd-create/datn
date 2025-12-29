from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship


class Favorites(Base):
    __tablename__ = "favorites"

    favorite_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_favorites_buyer_id"), primary_key=True)
    favorite_product_id = Column(
        Integer, ForeignKey("products.product_id", name="fk_favorites_product_id"), primary_key=True
    )

    buyer = relationship("Buyers", back_populates="favorites")
    product = relationship("Products", back_populates="favorites")
