from sqlalchemy import Column, Integer, String, Enum, Time, ForeignKeyConstraint, Index
from sqlalchemy.orm import relationship
from .Base import Base


class OperatingTimes(Base):
    __tablename__ = "operating_times"

    operating_time_seller_id = Column(Integer, primary_key=True)
    operating_time_shop_name = Column(String(100), primary_key=True)
    operating_time_dow = Column(
        Enum(
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ),
        primary_key=True,
    )
    operating_time_opening = Column(Time, nullable=False)
    operating_time_closing = Column(Time, nullable=False)

    __table_args__ = (
        Index(
            "idx_operating_times_shop",
            "operating_time_shop_name",
            "operating_time_seller_id",
        ),
        ForeignKeyConstraint(
            ["operating_time_shop_name", "operating_time_seller_id"],
            ["shops.shop_name", "shops.shop_seller_id"],
            ondelete="CASCADE",
            name="fk_operating_times_shop",
        ),
    )

    shop = relationship(
        "Shops",
        back_populates="operating_times",
        foreign_keys=[operating_time_shop_name, operating_time_seller_id],
    )
