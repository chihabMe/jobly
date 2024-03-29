from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

# from djoser import urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("authentication.urls", namespace="authentication")),
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/jobs/", include("jobs.urls")),
    path("api/v1/locations/", include("locations.urls")),
    path("api/v1/reviews/", include("reviews.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
