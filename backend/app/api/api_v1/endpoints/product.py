from fastapi import APIRouter, status, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services import ProductService
from app.schemas import SearchProductRequest

router = APIRouter()


@router.post("/", status_code=status.HTTP_200_OK)
def search_products(
    search_request: SearchProductRequest,
    db: Session = Depends(get_db),
):
    """[CONTROLLER] Search a list of products."""

    product_service = ProductService(db)
    return product_service.search_products(search_request)
