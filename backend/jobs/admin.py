from django.contrib import admin

from .models import Job


@admin.register(Job)
class JobAdminManager(admin.ModelAdmin):
    list_view = ["title", "user", "salary", "active"]

    prepopulated_fields = {"slug": ["title"]}


# Register your models here.
