from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    CompanyDetailView,
    CompanyJobs,
    CurrentUserProfileView,
    RegistrationView,
)

app_name = "accounts"

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name="registration"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # current user profile
    path("me/", CurrentUserProfileView.as_view(), name="current_employee_profile"),
    # company open jobs
    path("company/<slug:slug>/jobs/", CompanyJobs.as_view(), name="company_open_jobs"),
    path("company/<slug:slug>/", CompanyDetailView.as_view(), name="company_open_jobs"),
]
