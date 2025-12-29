from fastapi_mail import ConnectionConfig
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import Optional


class MailSettings(BaseSettings):
    MAIL_USERNAME: Optional[str] = None
    MAIL_PASSWORD: Optional[str] = None
    MAIL_FROM: Optional[str] = None
    MAIL_PORT: int = 587
    MAIL_SERVER: Optional[str] = None
    MAIL_FROM_NAME: str = "DATN"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # ignore other env vars so instantiation won't fail
    )


def get_mail_conf() -> ConnectionConfig:
    s = MailSettings()
    return ConnectionConfig(
        MAIL_USERNAME=s.MAIL_USERNAME,
        MAIL_PASSWORD=s.MAIL_PASSWORD,
        MAIL_FROM=s.MAIL_FROM,
        MAIL_PORT=s.MAIL_PORT,
        MAIL_SERVER=s.MAIL_SERVER,
        MAIL_FROM_NAME=s.MAIL_FROM_NAME,
        MAIL_STARTTLS=s.MAIL_STARTTLS,
        MAIL_SSL_TLS=s.MAIL_SSL_TLS,
        USE_CREDENTIALS=True,
    )
