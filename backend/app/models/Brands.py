from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .Base import Base


class Brands(Base):
    __tablename__ = "brands"

    brand_id = Column(Integer, primary_key=True, autoincrement=True)
    brand_name = Column(String(100), nullable=False, unique=True)

    products = relationship("ProductBrands", back_populates="brand")
