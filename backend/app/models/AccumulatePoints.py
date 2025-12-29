from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime


class AccumulatePoints(Base):
    __tablename__ = "accumulate_points"

    accumulate_points_id = Column(Integer, primary_key=True, autoincrement=True)
    accumulate_points_created_at = Column(DateTime, default=datetime.utcnow)
    accumulate_points_number = Column(Integer, nullable=False, default=0)
    accumulate_points_buyer_id = Column(
        Integer, ForeignKey("buyers.user_id", name="fk_accumulate_points_buyer_id"), nullable=False
    )
    accumulate_points_order_id = Column(
        Integer, ForeignKey("orders.order_id", name="fk_accumulate_points_order_id"), nullable=True
    )

    buyer = relationship("Buyers", back_populates="accumulate_points")
    order = relationship("Orders", back_populates="accumulate_points")
