from sqlalchemy import Column, Integer, ForeignKey, String, ForeignKeyConstraint, Index
from sqlalchemy.orm import relationship
from .Base import Base


class FollowShops(Base):
    __tablename__ = "follow_shops"

    buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_follow_shops_buyer_id"), primary_key=True)
    shop_name = Column(String(100), primary_key=True)
    shop_seller_id = Column(Integer, primary_key=True)

    __table_args__ = (
        Index(
            "idx_follow_shops_shop",
            "shop_name",
            "shop_seller_id"
        ),
        ForeignKeyConstraint(
            ["shop_name", "shop_seller_id"],
            ["shops.shop_name", "shops.shop_seller_id"],
            name="fk_follow_shops_shop"
        ),
    )

    buyer = relationship("Buyers", back_populates="followed_shops")
    shop = relationship("Shops", back_populates="followers")