from .Base import Base
from sqlalchemy import Column, Integer, DateTime, Enum, Text, ForeignKey, DECIMAL, String
from sqlalchemy.orm import relationship


class Bids(Base):
    __tablename__ = "bids"

    bid_id = Column(Integer, primary_key=True, autoincrement=True)
    bid_start_date = Column(DateTime, nullable=False)
    bid_status = Column(
        Enum("active", "closed", "cancelled", name="bid_status_enum"),
        nullable=False,
        default="active",
        index=True,
    )
    bid_title = Column(Integer, nullable=False)
    bid_description = Column(Text, nullable=True)
    bid_end_date = Column(DateTime, nullable=False)
    bid_price_to = Column(DECIMAL(10, 2), nullable=False)
    bid_price_from = Column(DECIMAL(10, 2), nullable=False)
    bid_place = Column(String(255), nullable=True)
    bid_sub_order_id = Column(Integer, ForeignKey("sub_orders.sub_order_id", name="fk_bids_sub_order_id"), nullable=True)
    bid_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_bids_buyer_id"), nullable=False)
    questions = relationship("Questions", back_populates="bid")

    save_documents = relationship("SaveDocuments", back_populates="bid")
    submit_to_bids = relationship("SubmitToBids", back_populates="bid")
    buyer = relationship("Buyers", back_populates="bids")
    sub_order = relationship("SubOrders", back_populates="bid")
    categories = relationship("BidCategorys", back_populates="bid")