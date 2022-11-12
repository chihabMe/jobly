from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.forms import SlugField
from django.utils.text import slugify
from PIL import Image

from .validators import validate_file_extension


# from locations.models import Location


# from employees.models import Employee
# Create your models here.
class CustomManager(BaseUserManager):
    def create_user(self, email, username, password, *args, **kwargs):
        if not username:
            raise ValueError("the username is required")
        if not email:
            raise ValueError("  the email is required")
        if not password:
            raise ValueError("the password is required")
        user = CustomUser(username=username, email=email, *args, **kwargs)
        user.set_password(password)
        return user.save()

    def create_superuser(self, email, username, password, *args, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)

        if kwargs.get("is_staff") != True:
            raise ValueError("the superuser have to be a staff")
        if kwargs.get("is_superuser") != True:
            raise ValueError("the superuser have to be a superuser")
        if kwargs.get("is_active") != True:
            raise ValueError("the superuser have to be an  active account")
        return self.create_user(email, username, password, *args, **kwargs)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Types(models.TextChoices):
        EMPLOYEE = "EMPLOYEE", "Employee"
        COMPANY = "COMPANY", "Company"

    type = models.CharField(
        max_length=100, default=Types.EMPLOYEE, choices=Types.choices
    )
    email = models.EmailField(null=False, blank=False, unique=True)
    username = models.CharField(max_length=140, null=False, blank=False, unique=True)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "user"


class EmployeeManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return (
            super().get_queryset(*args, **kwargs).filter(type=CustomUser.Types.EMPLOYEE)
        )


class Employee(CustomUser):
    objects = EmployeeManager()
    type = CustomUser.Types.COMPANY

    class Meta:
        proxy = True


def cvFileNamer(instance, filename):
    return instance.user.username + "/cv/" + filename


def imageFileNamer(instance, filename):
    return instance.user.username + "/profile_image/" + filename


class EmployeeProfile(models.Model):

    user = models.OneToOneField(
        CustomUser, related_name="employee_profile", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to=imageFileNamer, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    book_marked_jobs = models.ManyToManyField(
        "jobs.Job", blank=True, null=True, related_name="book_marked_by"
    )
    applied_jobs = models.ManyToManyField(
        "jobs.Job", blank=True, null=True, related_name="applied_by"
    )
    updated = models.DateTimeField(auto_now=True)
    location = models.ForeignKey(
        "locations.Location",
        related_name="employees",
        default=15,
        on_delete=models.SET_NULL,
        null=True,
    )
    cv = models.FileField(
        upload_to=cvFileNamer,
        null=True,
        blank=True,
        validators=[validate_file_extension],
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            print(self.image.path)
            img = Image.open(self.image.path)
            if img.height > 400 or img.width > 400:
                new_size = (400, 400)
                img.thumbnail(new_size)
                img.save(self.image.path)


class CompanyManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(type=CustomUser.Types.COMPANY)


class Company(CustomUser):
    objects = CompanyManager()
    type = CustomUser.Types.COMPANY

    class Meta:
        proxy = True


class CompanyProfile(models.Model):

    user = models.OneToOneField(
        CustomUser, related_name="company_profile", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    description = models.TextField()
    image = models.ImageField(upload_to=imageFileNamer)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=300)
    updated = models.DateTimeField(auto_now=True)
    location = models.ForeignKey(
        "locations.Location",
        related_name="companies",
        default=15,
        on_delete=models.SET_NULL,
        null=True,
    )
    number_of_employees = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


@receiver(post_save, sender=CustomUser)
def crate_a_profile(sender, instance, created, **kwargs):
    if created and instance.type == CustomUser.Types.EMPLOYEE:
        employee = EmployeeProfile(name=instance.username, user=instance)
        employee.save()
    elif created and instance.type == CustomUser.Types.COMPANY:
        company = CompanyProfile(name=instance.username, user=instance)
        company.save()
