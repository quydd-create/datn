from sqlalchemy import Column, Integer, String, ForeignKey
from .Base import Base
from sqlalchemy.orm import relationship

class BidCategorys(Base):
    __tablename__ = "bid_categorys"

    bc_bid_id = Column(Integer, ForeignKey("bids.bid_id", name="fk_bid_categorys_bid_id"), primary_key=True)
    bc_category_id = Column(Integer, ForeignKey("categories.category_id", name="fk_bid_categorys_category_id"), primary_key=True)
    
    bid = relationship("Bids", back_populates="categories")
    category = relationship("Categories", back_populates="bids")