from app.enums import RoleMiddleware


def require_role(perm: RoleMiddleware):
    def decorator(func):
        setattr(func, "required_role", perm.value)
        return func

    return decorator
