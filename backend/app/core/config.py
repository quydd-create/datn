from pydantic_settings import BaseSettings
from typing import List
from typing import Optional


class Settings(BaseSettings):
    """Application settings."""

    # Basic settings
    PROJECT_NAME: str = "DATN Backend"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"

    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Database
    DATABASE_URL: str = "mysql+pymysql://username:password@localhost:3306/datn_db"

    # Mail settings
    MAIL_USERNAME: Optional[str] = None
    MAIL_PASSWORD: Optional[str] = None
    MAIL_FROM: Optional[str] = None
    MAIL_SERVER: Optional[str] = None
    MAIL_PORT: int = 587
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    MAIL_FROM_NAME: Optional[str] = None

    # JWT settings
    SECRET_KEY: str = "your_jwt_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Folder
    UPLOAD_FOLDER: str = "uploads"
    
    # File settings
    MAX_FILE_SIZE: int = 2 * 1024 * 1024  # 2 MB

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
