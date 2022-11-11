from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenVerifyView, TokenRefreshView)


from .views import (  EmployeeProfileView, RegistrationView,CompanyProfileView
                     )

app_name = 'accounts'

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name='registration'),
    path("token/", TokenObtainPairView.as_view(), name='token_obtain'),
    path("token/verify/", TokenVerifyView.as_view(), name='token_verify'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    #profile
    path("me/", EmployeeProfileView.as_view(), name='current_user'),
    path("company/me/", CompanyProfileView.as_view(), name='current_user'),
]
