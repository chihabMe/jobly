from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model


User =get_user_model()


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if not request.user.is_authenticated or request.user.type==User.Types.EMPLOYEE:
            return False
        return request.user.company_profile == obj.company
