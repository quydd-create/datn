from .Base import Base
from sqlalchemy import Column, Integer, DECIMAL, Text, ForeignKey
from sqlalchemy.orm import relationship


class BidProducts(Base):
    __tablename__ = "bid_products"

    bid_product_bid_document_id = Column(
        Integer, ForeignKey("bid_documents.bid_document_id", name="fk_bid_products_doc_id"), primary_key=True
    )
    bid_product_product_id = Column(Integer, ForeignKey("products.product_id", name="fk_bid_products_product_id"), primary_key=True)
    bid_product_quantity = Column(Integer, nullable=False)

    bid_document = relationship("BidDocuments", back_populates="products")
    product = relationship("Products", back_populates="bids")
