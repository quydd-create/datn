from .Base import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime


class Searchs(Base):
    __tablename__ = "searchs"

    search_id = Column(Integer, primary_key=True, autoincrement=True)
    search_content = Column(String(500), nullable=False, unique=True)
    search_count = Column(Integer, nullable=False, default=0)