from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class Questions(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, autoincrement=True)
    question_content = Column(String(500), nullable=False)
    question_reply = Column(String(500), nullable=True)
    seller_id = Column(Integer, ForeignKey("sellers.user_id", name="fk_questions_seller_id"), nullable=False)
    bid_id = Column(Integer, ForeignKey("bids.bid_id", name="fk_questions_bid_id"), nullable=False)

    bid = relationship("Bids", back_populates="questions")
    seller = relationship("Sellers", back_populates="questions")
