from .Base import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, Index, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime


class Reports(Base):
    __tablename__ = "reports"

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    report_ref_type = Column(
        String(50), nullable=False, index=True
    )  # e.g., "seller", "auction", "user", "order", "comment", etc.
    report_reason = Column(Text, nullable=True)
    report_created_at = Column(DateTime, default=datetime.utcnow)
    report_updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    report_status = Column(
        Enum("pending", "reviewed", "resolved", name="report_status_enum"),
        nullable=False,
        default="pending",
        index=True,
    )
    report_ref_id = Column(Integer, nullable=True, index=True)
    report_buyer_id = Column(Integer, ForeignKey("buyers.user_id", name="fk_reports_buyer_id"), nullable=False)

    __table_args__ = (
        Index("idx_report_type_status", "report_ref_type", "report_status"),
    )

    buyer = relationship("Buyers", back_populates="reports")
