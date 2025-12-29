from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from .Base import Base
from datetime import datetime


class Shops(Base):
    __tablename__ = "shops"

    shop_name = Column(String(100), nullable=False, primary_key=True)
    shop_seller_id = Column(
        Integer,
        ForeignKey("sellers.user_id", name="fk_shops_seller_id"),
        nullable=False,
        unique=True,
        primary_key=True,
    )
    shop_address = Column(String(255), nullable=True)
    shop_logo_url = Column(String(255), nullable=True)
    shop_banner_url = Column(String(255), nullable=True)
    shop_introduce = Column(Text, nullable=True)
    shop_hotline = Column(String(50), nullable=True)
    shop_created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    shop_province = Column(String(100), nullable=True)
    followers = relationship("FollowShops", back_populates="shop")
    
    operating_times = relationship("OperatingTimes", back_populates="shop")
    products = relationship("Products", back_populates="shop")
    seller = relationship("Sellers", back_populates="shops")
