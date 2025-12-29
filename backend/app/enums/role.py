from enum import Enum


class RoleMiddleware(Enum):
    ADMIN = "admin"
    SELLER = "seller"
    BUYER = "buyer"
    ANY = "any"  # Represents any authenticated user
