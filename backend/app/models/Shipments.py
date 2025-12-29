from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .Base import Base


class Shipments(Base):
    __tablename__ = "shipments"

    shipment_id = Column(Integer, primary_key=True, autoincrement=True)
    shipment_sub_order_id = Column(Integer, ForeignKey("sub_orders.sub_order_id", name="fk_shipments_sub_order_id"), nullable=False)
    shipment_carrier = Column(String(100), nullable=False)
    shipment_status = Column(
        Enum(
            "pending",
            "shipped",
            "in_transit",
            "delivered",
            "returned",
            name="shipment_status_enum",
        ),
        nullable=False,
        default="pending",
        index=True,
    )
    shipment_created_at = Column(DateTime, default=datetime.utcnow)
    shipment_updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    shipment_awb_no = Column(String(100), nullable=True)
    shipment_etd = Column(DateTime, nullable=True)
    shipment_type = Column(
        Enum("normal", "refund", name="shipment_type_enum"),
        nullable=False,
        default="normal",
    )

    sub_order = relationship("SubOrders", back_populates="shipments")
