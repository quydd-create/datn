from app.models import Buyers
from sqlalchemy.orm import Session


class BuyersRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, buyer: Buyers) -> Buyers:
        """
        Create a new buyer if id is not existed or
        update a buyer if id is existed to the database.
        """
        if buyer.user_id is None:
            self.db.add(buyer)
        else:
            self.db.merge(buyer)
        self.db.flush()
        return buyer

    def find_by_user_id(self, user_id: int) -> Buyers | None:
        """Find a buyer by user id."""
        return self.db.query(Buyers).filter(Buyers.user_id == user_id).first()
