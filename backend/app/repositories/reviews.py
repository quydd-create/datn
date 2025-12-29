from sqlalchemy.orm import Session
from app.models import Reviews
from typing import List


class ReviewsRepository:
    """Repository for Review operations."""

    def __init__(self, db: Session):
        self.db = db

    def find_by_product_id(self, product_id: int) -> List[Reviews]:
        """Find reviews by product ID."""
        return (
            self.db.query(Reviews).filter(Reviews.review_product_id == product_id).all()
        )
