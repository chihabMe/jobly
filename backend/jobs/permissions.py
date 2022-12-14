from django.contrib.auth import get_user_model
from rest_framework.permissions import SAFE_METHODS, BasePermission

User = get_user_model()


class IsOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if (
            not request.user.is_authenticated
            or request.user.type == User.Types.EMPLOYEE
        ):
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if (
            not request.user.is_authenticated
            or request.user.type == User.Types.EMPLOYEE
        ):
            return False
        return request.user.company_profile == obj.company
