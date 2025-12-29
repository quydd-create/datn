from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import UserRegister, UserLoginRequest, UserForgetPassword
from app.services import AuthService
from app.middlewares import AuthMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.decorators import require_role
from app.enums import RoleMiddleware

router = APIRouter()

router_auth = APIRouter(route_class=AuthMiddleware)

# Create scheme
bearer_scheme = HTTPBearer()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    """[CONTROLLER] Register a new user."""
    auth_service = AuthService(db)
    auth_service.register(user)
    return {"message": "User registered successfully."}


@router.post("/login", status_code=status.HTTP_200_OK)
def login(login_request: UserLoginRequest, db: Session = Depends(get_db)):
    """[CONTROLLER] User login."""
    auth_service = AuthService(db)
    return auth_service.login(login_request)


@router_auth.post("/logout", status_code=status.HTTP_200_OK)
@require_role(RoleMiddleware.ANY)
def logout(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    """[CONTROLLER] User logout."""
    auth_service = AuthService(db)
    auth_service.logout(token=credentials.credentials)
    return {"message": "User logged out successfully."}


@router.post("/change-password", status_code=status.HTTP_200_OK)
def change_password(
    request: UserForgetPassword,
    db: Session = Depends(get_db),
):
    """[CONTROLLER] Change password."""
    auth_service = AuthService(db)
    auth_service.change_password(request)
    return {"message": "Change password successfully."}
