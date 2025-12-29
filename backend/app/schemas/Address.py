from pydantic import BaseModel


class Address(BaseModel):
    id: int
    ward: str
    district: str
    description: str
    is_default: bool