from app.models import EndUsers
from sqlalchemy.orm import Session


class EndUsersRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, end_user: EndUsers) -> EndUsers:
        """
        Create a new end user if id is not existed or
        update a end user if id is existed to the database.
        """
        if end_user.user_id is None:
            self.db.add(end_user)
        else:
            self.db.merge(end_user)
        self.db.flush()
        return end_user
