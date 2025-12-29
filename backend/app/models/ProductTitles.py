from .Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship


class ProductTitles(Base):
    __tablename__ = "product_titles"

    pt_product_id = Column(Integer, ForeignKey("products.product_id", name="fk_product_titles_product_id"), primary_key=True)
    pt_title_id = Column(Integer, ForeignKey("titles.title_id", name="fk_product_titles_title_id"), primary_key=True)

    product = relationship("Products", back_populates="titles")
    title = relationship("Titles", back_populates="products")