from fastapi import APIRouter, status, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.middlewares import AuthMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.decorators import require_role
from app.enums import RoleMiddleware
from app.services import UserService
from app.schemas.User import UserProfileRequest


router = APIRouter()

router_auth = APIRouter(route_class=AuthMiddleware)

# Create scheme
bearer_scheme = HTTPBearer()


@router_auth.get("/me", status_code=status.HTTP_200_OK)
@require_role(RoleMiddleware.ANY)
def get_current_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    """[CONTROLLER] Get current user info."""
    user_service = UserService(db)
    return user_service.get_current_user(token=credentials.credentials)


@router_auth.put("/avatar", status_code=status.HTTP_200_OK)
@require_role(RoleMiddleware.ANY)
def update_avatar(
    avatar_file: UploadFile = File(..., description="The avatar image file (jpg, png, webp, jpeg) to upload. File size must not exceed 2 MB."),
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    """[CONTROLLER] Update user's avatar image."""
    user_service = UserService(db)
    avatar_url = user_service.update_avatar(
        token=credentials.credentials,
        avatar_file=avatar_file,
    )
    
    return {"message": "Avatar updated successfully.", "avatar_url": avatar_url}


@router_auth.put("/profile", status_code=status.HTTP_200_OK)
@require_role(RoleMiddleware.ANY)
def update_profile(
    profile_data: UserProfileRequest,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    """[CONTROLLER] Update user's profile."""
    user_service = UserService(db)
    user_service.update_profile(token=credentials.credentials, profile_data=profile_data)
    return {"message": "Profile updated successfully."}