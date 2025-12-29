from fastapi import APIRouter
from .endpoints import health, root, otps, auth, user, product

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(otps.router, prefix="/otps", tags=["otps"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(auth.router_auth, prefix="/auth", tags=["auth"])
api_router.include_router(user.router_auth, prefix="/users", tags=["users"])
api_router.include_router(product.router, prefix="/products", tags=["products"])

# Root router (without prefix for root endpoint)
root_router = APIRouter()
root_router.include_router(root.router, tags=["root"])
