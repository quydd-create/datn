from .Base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Admins(Base):
    __tablename__ = "admins"

    user_id = Column(Integer, ForeignKey("users.user_id", name="fk_admins_user_id"), primary_key=True)

    user = relationship("Users", back_populates="admin")
    tickets = relationship("Tickets", back_populates="admin")
