from sqlalchemy.orm import Session
from app.repositories import ProductsRepository, MediasRepository, ReviewsRepository
from app.schemas import SearchProductRequest, ProductResponse
from typing import List
from fastapi import HTTPException, status


class ProductService:
    """Service for Product operations."""

    def __init__(self, db: Session):
        self.db = db
        self.products_repository = ProductsRepository(self.db)
        self.medias_repository = MediasRepository(self.db)
        self.reviews_repository = ReviewsRepository(self.db)

    def search_products(
        self, search_request: SearchProductRequest
    ) -> List[ProductResponse]:
        """[SERVICE] Search products based on criteria."""

        try:
            products = self.products_repository.find_by_search_product_request(
                search_request
            )

            return [
                ProductResponse(
                    id=product.product_id,
                    name=product.product_name,
                    price=product.product_price,
                    image_url=self.medias_repository.find_first_by_product_id(
                        product.product_id
                    ).media_url,
                    rate=self.calculation_product_rate(product.product_id),
                )
                for product in products
            ]
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
            )

    def calculation_product_rate(self, product_id: int) -> float:
        """Calculate product rating."""

        reviews = self.reviews_repository.find_by_product_id(product_id)
        if not reviews:
            return 0.0
        total_rate = sum(review.review_rating for review in reviews)
        return round(total_rate / len(reviews), 1)
