from app.models import Sellers
from sqlalchemy.orm import Session


class SellersRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, seller: Sellers) -> Sellers:
        """
        Create a new seller if id is not existed or
        update a seller if id is existed to the database.
        """
        if seller.user_id is None:
            self.db.add(seller)
        else:
            self.db.merge(seller)
        self.db.flush()
        return seller

    def find_by_user_id(self, user_id: int) -> Sellers | None:
        """Find a seller by user id."""
        return self.db.query(Sellers).filter(Sellers.user_id == user_id).first()
