from app.models import Products, Brands, ProductBrands, Categories
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.schemas import SearchProductRequest
from typing import List
from app.enums import ProductStatus


class ProductsRepository:
    """Repository for Product operations."""

    def __init__(self, db: Session):
        self.db = db

    def find_by_search_product_request(
        self,
        request: SearchProductRequest,
    ) -> List[Products]:
        """Find products by categories, price range, point of manufacture, and brands."""
        query = self.db.query(Products)

        if request.categories:
            category_values = [category.value for category in request.categories]
            query = query.join(
                Categories, Products.product_category_id == Categories.category_id
            ).filter(Categories.category_name.in_(category_values))

        if request.price_from is not None:
            query = query.filter(Products.product_price >= request.price_from)

        if request.price_to is not None:
            query = query.filter(Products.product_price <= request.price_to)

        if request.poms:
            pom_values = [pom.value for pom in request.poms]
            query = query.filter(Products.product_pom.in_(pom_values))

        if request.brands:
            brand_values = [brand.value for brand in request.brands]
            query = (
                query.join(ProductBrands)
                .join(Brands, ProductBrands.product_brand_brand_id == Brands.brand_id)
                .filter(Brands.brand_name.in_(brand_values))
            )
        
        query = query.where(
            and_(
              Products.product_status == ProductStatus.ACTIVE.value,
              Products.product_type == "normal",
              Products.product_stock > 0,
            )
        )

        # sorting
        if request.sort_by == "price":
            if request.sort_order == "asc":
                query = query.order_by(Products.product_price.asc())
            elif request.sort_order == "desc":
                query = query.order_by(Products.product_price.desc())

        # pagination
        if request.page_no is not None and request.page_size is not None:
            offset = (request.page_no - 1) * request.page_size
            query = query.offset(offset).limit(request.page_size)

        products = query.all()
        return products
