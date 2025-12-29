from .Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship


class BlockSellers(Base):
    __tablename__ = "block_sellers"

    bs_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_block_sellers_buyer_id"), primary_key=True)
    bs_seller_id = Column(Integer, ForeignKey("sellers.user_id", name="fk_block_sellers_seller_id"), primary_key=True)
    
    buyer = relationship("Buyers", back_populates="block_sellers")
    seller = relationship("Sellers", back_populates="block_sellers")
