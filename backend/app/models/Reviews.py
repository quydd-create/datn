from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from datetime import datetime


class Reviews(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    review_comment = Column(Text, nullable=False)
    review_rating = Column(Integer, nullable=False)
    review_created_at = Column(DateTime, default=datetime.utcnow)
    review_updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    review_reply = Column(Text, nullable=True)
    review_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_reviews_buyer_id"))
    review_product_id = Column(Integer, ForeignKey("products.product_id", name="fk_reviews_product_id"))

    buyer = relationship("Buyers", back_populates="reviews")
    product = relationship("Products", back_populates="reviews")
    review_likes = relationship("ReviewLikes", back_populates="review")
