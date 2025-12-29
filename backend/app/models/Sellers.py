from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship


class Sellers(Base):
    __tablename__ = "sellers"

    user_id = Column(Integer, ForeignKey("end_users.user_id", name="fk_sellers_user_id"), primary_key=True)
    seller_available_balance = Column(Integer, default=0, nullable=False)
    receive_method_bin = Column(String(100), nullable=True)
    receive_method_banknum = Column(String(50), nullable=True)
    receive_method_name = Column(String(100), nullable=True)

    block_sellers = relationship("BlockSellers", back_populates="seller")
    titles = relationship("Titles", back_populates="seller")
    questions = relationship("Questions", back_populates="seller")
    end_user = relationship("EndUsers", back_populates="seller")
    shops = relationship("Shops", back_populates="seller")
    withdrawal_histories = relationship("WithdrawalHistories", back_populates="seller")
    vouchers = relationship("Vouchers", back_populates="seller")
    bid_documents = relationship("BidDocuments", back_populates="seller")