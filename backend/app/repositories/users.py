from sqlalchemy.orm import Session
from app.models import Users


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, user: Users) -> Users:
        """
        Create a new user if id is not existed or
        update a user if id is existed to the database.
        """
        if user.user_id is None:
            self.db.add(user)
        else:
            self.db.merge(user)
        self.db.flush()
        return user

    def find_by_email(self, email: str) -> Users | None:
        """Find a user by email."""
        return self.db.query(Users).filter(Users.user_email == email).first()

    def find_by_phone_number(self, phone_number: str) -> Users | None:
        """Find a user by phone number."""
        return (
            self.db.query(Users).filter(Users.user_phone_number == phone_number).first()
        )

    def find_by_id(self, user_id: int) -> Users | None:
        """Find a user by ID."""
        return self.db.query(Users).filter(Users.user_id == user_id).first()
