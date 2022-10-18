from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
    TokenRefreshView
    )

from .views import (ProfileView, RegistrationView, UsersList,)
app_name='accounts'

urlpatterns = [
    path("registration/",RegistrationView.as_view(),name='registration'),
    path("token/",TokenObtainPairView.as_view(),name='token_obtain'),
    path("token/verify/",TokenVerifyView.as_view(),name='token_verify'),
    path("token/refresh/",TokenRefreshView.as_view(),name='token_refresh'),
    #profile
    path("<str:name>/profile/",ProfileView.as_view(),name='profile'),
]
    
 