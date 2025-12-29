from app.models import BlacklistTokens
from sqlalchemy.orm import Session


class BlacklistTokensRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, token: BlacklistTokens) -> BlacklistTokens:
        """
        Create a new blacklisted token if id is not existed or
        update a blacklisted token if id is existed to the database.
        """
        if token.bt_id is None:
            self.db.add(token)
        else:
            self.db.merge(token)
        self.db.flush()
        return token

    def find_by_token(self, token_str: str) -> BlacklistTokens | None:
        """Find a blacklisted token by token string."""
        return (
            self.db.query(BlacklistTokens)
            .filter(BlacklistTokens.bt_token == token_str)
            .first()
        )
