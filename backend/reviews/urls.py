from django.urls import path

from . import views

app_name = "reviews"

urlpatterns = [
    path("company/<slug:company_slug>/", views.company_reviews, name="company_reviews"),
    path(
        "company/<slug:company_slug>/my-review/",
        views.get_review,
        name="company_review",
    ),
]
