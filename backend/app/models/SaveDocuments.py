from .Base import Base
from sqlalchemy import Column, Integer, DateTime, Enum, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime


class SaveDocuments(Base):
    __tablename__ = "save_documents"

    sd_bid_document_id = Column(
        Integer, ForeignKey("bid_documents.bid_document_id", name="fk_save_documents_doc_id"), primary_key=True
    )
    sd_bid_id = Column(Integer, ForeignKey("bids.bid_id", name="fk_save_documents_bid_id"), primary_key=True)

    bid_document = relationship("BidDocuments", back_populates="save_documents")
    bid = relationship("Bids", back_populates="save_documents")