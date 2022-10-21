from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenVerifyView, TokenRefreshView)

from .views import (  RegistrationView,
                     authenticated_user_view)

app_name = 'accounts'

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name='registration'),
    path("token/", TokenObtainPairView.as_view(), name='token_obtain'),
    path("token/verify/", TokenVerifyView.as_view(), name='token_verify'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    #profile
    path("me/", authenticated_user_view, name='current_user'),
]
