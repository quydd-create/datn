from app.models import Addresses
from sqlalchemy.orm import Session


class AddressesRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, address: Addresses) -> Addresses:
        """
        Create a new address if id is not existed or
        update a address if id is existed to the database.
        """
        if address.address_id is None:
            self.db.add(address)
        else:
            self.db.merge(address)
        self.db.flush()
        return address

    def find_by_buyer_id(self, buyer_id: int) -> list[Addresses]:
        """Find all addresses by buyer id."""
        return (
            self.db.query(Addresses)
            .filter(Addresses.address_buyer_id == buyer_id)
            .all()
        )
