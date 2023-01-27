from django.urls import include, path

from . import views

app_name = "authentication"
urlpatterns = [
    path("", include("djoser.urls")),
    path("", include("djoser.urls.jwt")),
    path("csrf/", views.get_csrf, name="get_csrf"),
    path("login/", views.loginView, name="login")
    #
]
