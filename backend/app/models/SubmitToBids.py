from .Base import Base
from sqlalchemy import Column, Integer, DateTime, Enum, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime


class SubmitToBids(Base):
    __tablename__ = "submit_to_bids"

    stb_bid_document_id = Column(
        Integer, ForeignKey("bid_documents.bid_document_id", name="fk_submit_to_bids_doc_id"), primary_key=True
    )
    stb_bid_id = Column(Integer, ForeignKey("bids.bid_id", name="fk_submit_to_bids_bid_id"), primary_key=True)
    stb_status = Column(
        Enum("submitted", "accepted", "rejected", name="stb_status_enum"),
        nullable=False,
        default="submitted",
        index=True,
    )
    stb_created_at = Column(DateTime, default=datetime.utcnow)

    bid = relationship("Bids", back_populates="submit_to_bids")
    bid_document = relationship("BidDocuments", back_populates="submit_to_bids")
