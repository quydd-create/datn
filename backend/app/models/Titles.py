from .Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship


class Titles(Base):
    __tablename__ = "titles"

    title_id = Column(Integer, primary_key=True, autoincrement=True)
    title_name = Column(String(255), nullable=False, unique=True)
    title_order = Column(Integer, nullable=False, default=0)
    title_description = Column(String(500), nullable=True)
    title_status = Column(String(255), nullable=False, default="active")
    title_seller_id = Column(Integer, ForeignKey("sellers.user_id", name="fk_titles_seller_id"), nullable=False)
    
    products = relationship("ProductTitles", back_populates="title")
    seller = relationship("Sellers", back_populates="titles")