from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.middlewares import DBSessionMiddleware

from app.api.api_v1.api import api_router, root_router
from app.core.config import settings
import os

# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for DATN project",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(DBSessionMiddleware)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory for uploads
if not os.path.exists(settings.UPLOAD_FOLDER):
    os.makedirs(settings.UPLOAD_FOLDER)
app.mount(f"/{settings.UPLOAD_FOLDER}", StaticFiles(directory=settings.UPLOAD_FOLDER), name="uploads")

# Include routers
app.include_router(root_router)
app.include_router(api_router, prefix=settings.API_V1_STR)  # API v1 endpoints
