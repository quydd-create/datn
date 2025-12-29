from fastapi.routing import APIRoute
from fastapi import Request, HTTPException
from sqlalchemy.orm import Session
from app.repositories import BlacklistTokensRepository, UserRepository
from app.utils import jwt
from app.enums import UserStatus
from jose import JWTError
from app.enums import RoleMiddleware


class AuthMiddleware(APIRoute):
    """Middleware to handle authentication for protected routes."""

    def get_route_handler(self):
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request):
            try:
                # get role
                required_role = getattr(self.endpoint, "required_role", None)

                token = request.headers.get("Authorization")
                if not token:
                    raise HTTPException(status_code=401, detail="Unauthorized")

                token_str = token.split(" ")[1]

                # Get db Session
                db: Session = request.state.db
                bt_repository = BlacklistTokensRepository(db)
                user_repository = UserRepository(db)

                # Check blacklist
                if bt_repository.find_by_token(token_str=token_str):
                    raise HTTPException(status_code=401, detail="Token is blacklisted")

                try:
                    payload = jwt.decode_token(token=token_str)

                    # Check user is_active
                    user = user_repository.find_by_id(user_id=payload.get("user_id"))
                    if not user:
                        raise HTTPException(
                            status_code=404, detail="User is not found!"
                        )
                    if user.user_status != UserStatus.ACTIVE.value:
                        raise HTTPException(
                            status_code=403, detail="User is not active!"
                        )
                    roles = payload.get("roles")

                    if (
                        required_role not in roles
                        and RoleMiddleware.ADMIN.value not in roles
                        and required_role != RoleMiddleware.ANY.value
                    ):
                        raise HTTPException(status_code=403, detail="Permission denied")

                except JWTError:
                    raise HTTPException(status_code=401, detail="Invalid token")

                return await original_route_handler(request)
            except HTTPException as e:
                raise e
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

        return custom_route_handler
