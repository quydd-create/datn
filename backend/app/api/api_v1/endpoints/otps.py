from fastapi import APIRouter, status, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services import OtpService
from pydantic import EmailStr

router = APIRouter()


@router.post("/generate", status_code=status.HTTP_201_CREATED)
async def generate_otp(
    email: EmailStr = Query(
        ...,
        description="The email address to send the OTP to.",
        example="example@gmail.com",
    ),
    is_forget_password: bool = Query(
        False,
        description="Indicates if the OTP is for password recovery.",
        example=False,
    ),
    db: Session = Depends(get_db),
):
    """[CONTROLLER] Generate a new OTP."""

    otp_service = OtpService(db)
    await otp_service.generate_otp(email, is_forget_password)
    return {"message": "OTP generated and sent to email successfully."}


@router.post("/verify", status_code=status.HTTP_200_OK)
def verify_otp(
    email: EmailStr = Query(
        ...,
        description="The email address to verify the OTP code.",
        example="example@gmail.com",
    ),
    code: str = Query(
        ...,
        description="The OTP code to verify.",
        example="123456",
        min_length=6,
        max_length=6,
    ),
    db: Session = Depends(get_db),
):
    """[CONTROLLER] Verify an OTP."""

    otp_service = OtpService(db)
    otp_service.verify_otp(email, code)

    return {"message": "OTP verified successfully."}
