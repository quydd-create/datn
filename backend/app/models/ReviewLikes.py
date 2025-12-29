from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, PrimaryKeyConstraint
from datetime import datetime
from sqlalchemy.orm import relationship


class ReviewLikes(Base):
    __tablename__ = "review_likes"

    review_like_review_id = Column(
        Integer, ForeignKey("reviews.review_id", name="fk_review_likes_review_id"), primary_key=True
    )
    review_like_buyer_id = Column(
        Integer, ForeignKey("buyers.user_id", name="fk_review_likes_buyer_id"), primary_key=True
    )
    review_like_created_at = Column(DateTime, default=datetime.utcnow)

    buyer = relationship("Buyers", back_populates="review_likes")
    review = relationship("Reviews", back_populates="review_likes")
