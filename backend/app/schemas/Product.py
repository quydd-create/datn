from pydantic import BaseModel, Field
from app.enums import ProductCategory, Pom, Brand
from typing import List


class SearchProductRequest(BaseModel):
    page_size: int = Field(
        ..., gt=0, description="Number of products per page", example=10
    )
    page_no: int = Field(..., gt=0, description="Page number to retrieve", example=1)
    categories: List[ProductCategory] = Field(
        None,
        description="List of product categories to filter by",
        example=[ProductCategory.ELECTRONICS, ProductCategory.MEN_FASHION],
    )
    price_from: float = Field(
        None, ge=0, description="Minimum price of the product", example=100.0
    )
    price_to: float = Field(
        None, ge=0, description="Maximum price of the product", example=1000.0
    )
    poms: List[Pom] = Field(
        None,
        description="List of product place of manufacture to filter by",
        example=[Pom.HO_CHI_MINH, Pom.HA_NOI],
    )
    brands: List[Brand] = Field(
        None,
        description="List of product brands to filter by",
        example=[Brand.GUCCI, Brand.PUMA],
    )
    sort_by: str = Field(
        None,
        description="Sorting criteria for the products",
        example="price",
    )  # e.g., "price"
    sort_order: str = Field(
        None,
        description="Sorting order: 'asc' for ascending, 'desc' for descending",
        example="asc",
    )  # "asc" or "desc"


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    image_url: str
    rate: float


class SearchProductResponse(BaseModel):
    total_results: int
    total_pages: int
    current_page: int
    products: List[ProductResponse]
