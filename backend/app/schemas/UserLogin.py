from pydantic import BaseModel, EmailStr, Field


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(
        ..., example="example@gmail.com", description="The email address of the user."
    )
    password: str = Field(
        ...,
        example="Abcd@123",
        description="The password of the user.",
    )


class UserInfo(BaseModel):
    user_id: int = Field(..., description="The unique identifier of the user.")
    user_email: EmailStr = Field(..., description="The email address of the user.")
    user_phone_number: str = Field(..., description="The phone number of the user.")
    user_first_name: str | None = Field(None, description="The first name of the user.")
    user_last_name: str | None = Field(None, description="The last name of the user.")
    user_gender: str | None = Field(None, description="The gender of the user.")
    user_dob: str | None = Field(None, description="The date of birth of the user.")
    user_status: str = Field(..., description="The status of the user.")
    user_avatar_url: str | None = Field(
        None, description="The avatar URL of the user."
    )


class UserLoginResponse(BaseModel):
    access_token: str = Field(..., description="The JWT access token.")
