from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime
from typing import Dict, Any

from app.core.database import get_db
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=Dict[str, Any])
async def health_check():
    """
    Simple health check endpoint.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
    }


@router.get("/detailed", response_model=Dict[str, Any])
async def detailed_health_check(db: Session = Depends(get_db)):
    """
    Detailed health check including database connection.
    """
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "checks": {"database": "unknown"},
    }

    # Check database connection
    try:
        # Try to execute a simple query
        result = db.execute(text("SELECT 1"))
        result.fetchone()
        health_status["checks"]["database"] = "healthy"
    except Exception as e:
        health_status["checks"]["database"] = "unhealthy"
        health_status["status"] = "unhealthy"
        health_status["error"] = f"Database connection failed: {str(e)}"

    # Return 503 if any check fails
    if health_status["status"] == "unhealthy":
        raise HTTPException(status_code=503, detail=health_status)

    return health_status
