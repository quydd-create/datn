from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .Base import Base


class Medias(Base):
    __tablename__ = "medias"

    media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_url = Column(String(255), nullable=False)
    media_type = Column(String(50), nullable=False)
    media_ref_type = Column(String(50), nullable=False)
    media_ref_id = Column(Integer, nullable=True)