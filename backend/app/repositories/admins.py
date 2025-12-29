from app.models import Admins
from sqlalchemy.orm import Session


class AdminsRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, admin: Admins) -> Admins:
        """
        Create a new admin if id is not existed or
        update a admin if id is existed to the database.
        """
        if admin.user_id is None:
            self.db.add(admin)
        else:
            self.db.merge(admin)
        self.db.flush()
        return admin

    def find_by_user_id(self, user_id: int) -> Admins | None:
        """Find a admin by user id."""
        return self.db.query(Admins).filter(Admins.user_id == user_id).first()
