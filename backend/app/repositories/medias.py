from app.models import Medias
from sqlalchemy.orm import Session
from app.enums import MediaType


class MediasRepository:
    """Repository for Media operations."""

    def __init__(self, db: Session):
        self.db = db

    def find_first_by_product_id(self, product_id: int) -> Medias:
        """Find images by product ID."""
        return (
            self.db.query(Medias).filter(Medias.media_ref_id == product_id and Medias.media_ref_type == MediaType.PRODUCT.value).first()
        )
