from django.urls import include, path

app_name = "authentication"
urlpatterns = [
    path("", include("djoser.urls")),
    path("", include("djoser.urls.jwt")),
    #
]
