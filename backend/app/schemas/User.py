from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator
from app.schemas import Address
from typing import List
from typing import Optional

from app.enums import Gender


class UserProfileResponse(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    gender: Optional[str]
    phone_number: str
    email: EmailStr
    dob: Optional[str]
    avatar_url: Optional[str]
    roles: List[str]


class SellerProfileResponse(UserProfileResponse):
    bin: Optional[str]
    banknum: Optional[str]
    name: Optional[str]
    available_balance: float


class BuyerProfileResponse(UserProfileResponse):
    addresses: List[Address]
    point: int


class BuyerAndSellerProfileReponse(BuyerProfileResponse, SellerProfileResponse):
    pass


class UserProfileRequest(BaseModel):
    first_name: Optional[str] = Field(
        None, example="John", description="The first name of the user."
    )
    last_name: Optional[str] = Field(
        None, example="Doe", description="The last name of the user."
    )
    dob: Optional[str] = Field(
        None,
        example="01-01-1990",
        description="The date of birth of the user in DD-MM-YYYY format.",
    )
    gender: Optional[str] = Field(
        None, example="male", description="The gender of the user."
    )
    
    @field_validator("gender")
    def validate_gender(cls, value):
        if value:
            if value not in [gender.value for gender in Gender]:
                raise ValueError("Invalid gender. Expected male, female, or other.")
        return value

    @field_validator("dob")
    def parse_dob(cls, value):
        if value is None:
            return None
        try:
            return datetime.strptime(value, "%d-%m-%Y").date()
        except ValueError:
            raise ValueError("Invalid date format. Expected DD-MM-YYYY.")
