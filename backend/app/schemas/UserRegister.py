from pydantic import BaseModel, EmailStr, Field, field_validator
import re
from typing import Optional
from app.enums import Gender, UserStatus
from app.models import Users
from datetime import datetime


class UserRegister(BaseModel):
    first_name: Optional[str] = Field(
        None, example="John", description="The first name of the user."
    )
    last_name: Optional[str] = Field(
        None, example="Doe", description="The last name of the user."
    )
    phone_number: str = Field(
        ..., example="012345679", description="The phone number of the user."
    )
    dob: Optional[str] = Field(
        None,
        example="01-01-1990",
        description="The date of birth of the user in DD-MM-YYYY format.",
    )
    gender: Optional[Gender] = Field(
        None, example="male", description="The gender of the user."
    )
    email: EmailStr = Field(
        ..., example="example@gmail.com", description="The email address of the user."
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=16,
        example="Abcd@123",
        description=(
            "Password must have at least 8 characters, "
            "including uppercase, lowercase, number, and special character."
        ),
    )
    confirm_password: str = Field(
        ...,
        min_length=8,
        max_length=16,
        example="Abcd@123",
        description="Confirmation of the password.",
    )
    otp_code: str = Field(
        ...,
        min_length=6,
        max_length=6,
        example="123456",
        description="The OTP code sent to the user's email for verification.",
    )

    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must include at least one lowercase letter.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must include at least one uppercase letter.")
        if not re.search(r"\d", value):
            raise ValueError("Password must include at least one number.")
        if not re.search(r"[@$!%*?&]", value):
            raise ValueError(
                "Password must include at least one special character (@$!%*?&)."
            )
        return value

    @field_validator("dob")
    def validate_dob(cls, value):
        if value:
            try:
                datetime.strptime(value, "%d-%m-%Y")
            except ValueError:
                raise ValueError("Invalid date format. Expected DD-MM-YYYY.")
        return value

    def to_orm(self) -> Users:
        """Convert the Pydantic model to an ORM Users model."""
        dob_converted = None
        if self.dob:
            try:
                dob_converted = datetime.strptime(self.dob, "%d-%m-%Y")
            except ValueError:
                raise ValueError("Invalid date format. Expected DD-MM-YYYY.")
        return Users(
            user_first_name=self.first_name,
            user_last_name=self.last_name,
            user_phone_number=self.phone_number,
            user_dob=dob_converted,
            user_gender=self.gender,
            user_email=self.email,
            user_password=self.password,
            user_status=UserStatus.ACTIVE.value,
        )
