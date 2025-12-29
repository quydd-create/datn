from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Buyers(Base):
    __tablename__ = "buyers"

    buyer_point = Column(Integer, default=0, nullable=False)
    user_id = Column(Integer, ForeignKey("end_users.user_id", name="fk_buyers_user_id"), primary_key=True)

    accumulate_points = relationship("AccumulatePoints", back_populates="buyer")
    addresses = relationship("Addresses", back_populates="buyer")
    bids = relationship("Bids", back_populates="buyer")
    end_user = relationship("EndUsers", back_populates="buyer")
    reports = relationship("Reports", back_populates="buyer")
    reviews = relationship("Reviews", back_populates="buyer")
    review_likes = relationship("ReviewLikes", back_populates="buyer")
    favorites = relationship("Favorites", back_populates="buyer")
    shopping_carts = relationship("ShoppingCarts", back_populates="buyer")
    orders = relationship("Orders", back_populates="buyer")
    vouchers = relationship("BuyerVouchers", back_populates="buyer")
    followed_shops = relationship("FollowShops", back_populates="buyer")
    block_sellers = relationship("BlockSellers", back_populates="buyer")
