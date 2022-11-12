from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenVerifyView, TokenRefreshView)


from .views import (   RegistrationView,
                        CurrentUserProfileView,
                     )

app_name = 'accounts'

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name='registration'),
    path("token/", TokenObtainPairView.as_view(), name='token_obtain'),
    path("token/verify/", TokenVerifyView.as_view(), name='token_verify'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    #current user profile
    path("me/", CurrentUserProfileView.as_view(), name='current_employee_profile'),
]
