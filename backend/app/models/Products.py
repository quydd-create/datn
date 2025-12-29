from .Base import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Index,
    ForeignKey,
    DECIMAL,
    Enum,
    CheckConstraint,
    ForeignKeyConstraint,
)
from sqlalchemy.orm import relationship
from datetime import datetime


class Products(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(255), nullable=False, index=True)
    product_description = Column(Text, nullable=True)
    product_price = Column(DECIMAL(10, 2), nullable=False)
    product_stock = Column(Integer, default=0, nullable=False)
    product_status = Column(
        Enum("active", "inactive", "discontinued", name="product_status_enum"),
        nullable=False,
        default="active",
        index=True,
    )
    product_pom = Column(String(100), nullable=True)
    product_created_at = Column(DateTime, default=datetime.utcnow)
    product_updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    product_unit = Column(String(50), nullable=True)
    product_type = Column(String(100), nullable=True)
    product_condition = Column(Integer, nullable=False)
    product_more_info = Column(Text, nullable=True)
    product_category_id = Column(
        Integer, ForeignKey("categories.category_id", name="fk_products_category_id"), nullable=False
    )
    product_shop_seller_id = Column(Integer, nullable=False)
    product_shop_name = Column(String(100), nullable=False)

    __table_args__ = (
        Index(
            "idx_products_category_status",
            "product_category_id",
            "product_status",
        ),
        Index(
            "idx_products_shop",
            "product_shop_seller_id",
            "product_shop_name",
        ),
        CheckConstraint(
            "product_price >= 0",
            name="check_product_price_positive",
        ),
        CheckConstraint(
            "product_stock >= 0",
            name="check_product_stock_nonnegative",
        ),
        ForeignKeyConstraint(
            ["product_shop_seller_id", "product_shop_name"],
            ["shops.shop_seller_id", "shops.shop_name"],
            ondelete="CASCADE",
            name="fk_products_shop",
        ),
    )
    
    bids = relationship("BidProducts", back_populates="product")
    category = relationship("Categories", back_populates="products")
    order_items = relationship("OrderItems", back_populates="product")
    reviews = relationship("Reviews", back_populates="product")
    favorites = relationship("Favorites", back_populates="product")
    shopping_carts = relationship("ShoppingCarts", back_populates="product")
    brands = relationship("ProductBrands", back_populates="product")
    shop = relationship(
        "Shops",
        back_populates="products",
        foreign_keys=[product_shop_seller_id, product_shop_name],
    )
    titles = relationship("ProductTitles", back_populates="product")

