from .Base import Base
from sqlalchemy import Column, Integer, DECIMAL, Text, ForeignKey
from sqlalchemy.orm import relationship


class BidDocuments(Base):
    __tablename__ = "bid_documents"

    bid_document_id = Column(Integer, primary_key=True, autoincrement=True)
    bid_document_description = Column(Text, nullable=True)
    bid_document_price = Column(DECIMAL(10, 2), nullable=False)
    bid_seller_id = Column(Integer, ForeignKey("sellers.user_id", name="fk_bid_documents_seller_id"), nullable=False)

    seller = relationship("Sellers", back_populates="bid_documents")
    submit_to_bids = relationship("SubmitToBids", back_populates="bid_document")
    products = relationship("BidProducts", back_populates="bid_document")
    save_documents = relationship("SaveDocuments", back_populates="bid_document")
