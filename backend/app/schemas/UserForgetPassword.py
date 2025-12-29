from pydantic import BaseModel, EmailStr, Field
import re
from pydantic import field_validator


class UserForgetPassword(BaseModel):
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
