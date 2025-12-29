from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from app.core.database import SessionLocal


class DBSessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request.state.db = SessionLocal()
        response = await call_next(request)
        request.state.db.close()
        return response
