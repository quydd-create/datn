from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class ProductBrands(Base):
    __tablename__ = "product_brands"

    product_brand_product_id = Column(
        Integer, ForeignKey("products.product_id", name="fk_product_brands_product_id"), primary_key=True
    )
    product_brand_brand_id = Column(
        Integer, ForeignKey("brands.brand_id", name="fk_product_brands_brand_id"), primary_key=True
    )

    product = relationship("Products", back_populates="brands")
    brand = relationship("Brands", back_populates="products")
