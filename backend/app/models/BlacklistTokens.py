from .Base import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime


class BlacklistTokens(Base):
    __tablename__ = "blacklist_tokens"

    bt_id = Column(Integer, primary_key=True, autoincrement=True)
    bt_token = Column(String(500), nullable=False, unique=True)
    bt_created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
