from .Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Addresses(Base):
    __tablename__ = "addresses"

    address_id = Column(Integer, primary_key=True, autoincrement=True)
    address_is_default = Column(Integer, default=0, nullable=False)
    address_district = Column(String(100), nullable=False)
    address_description = Column(String(255), nullable=False)
    address_user_name = Column(String(100), nullable=False)
    address_user_phone = Column(String(15), nullable=False)
    address_province = Column(String(100), nullable=False)
    address_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_addresses_buyer_id"), nullable=False)

    buyer = relationship("Buyers", back_populates="addresses")
    orders = relationship("Orders", back_populates="address")
