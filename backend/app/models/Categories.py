from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class Categories(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(100), nullable=False, unique=True)
    category_parent_id = Column(
        Integer, ForeignKey("categories.category_id", name="fk_categories_parent_id"), nullable=True
    )
    category_image_url = Column(String(255), nullable=True)
    
    bids = relationship("BidCategorys", back_populates="category")
    parent = relationship(
        "Categories",
        remote_side=[category_id],
        back_populates="subcategories",
        uselist=False,
    )
    subcategories = relationship(
        "Categories", back_populates="parent", cascade="all, delete-orphan"
    )
    products = relationship("Products", back_populates="category")
