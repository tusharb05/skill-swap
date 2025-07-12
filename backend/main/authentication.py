from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import CustomUser
from .utils.jwt_utils import decode_jwt

class SimpleJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            raise AuthenticationFailed("Invalid or expired token")

        try:
            user = CustomUser.objects.get(id=payload["user_id"])
        except CustomUser.DoesNotExist:
            raise AuthenticationFailed("User not found")

        return (user, None)
