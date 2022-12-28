from accounts.models import CompanyProfile, CompanyRate, EmployeeProfile
from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()
# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "is_staff", "is_superuser", "is_active")
    search_fields = ("username", "email")
    list_filter = ("is_staff", "is_superuser", "is_active")


@admin.register(EmployeeProfile)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("name", "cv", "created", "updated")
    search_fields = ("name",)
    list_filter = ()


@admin.register(CompanyProfile)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "created", "updated")
    search_fields = ("name",)
    list_filter = ()


admin.site.register(CompanyRate)
