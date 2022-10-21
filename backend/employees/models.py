from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()


def cvFileNamer(instance, filename):
    return instance.user.username + "/cv/" + filename


def imageFileNamer(instance, filename):
    return instance.user.username + "/profile_image/" + filename


class Employee(models.Model):

    user = models.OneToOneField(User,
                                related_name='employee_profile',
                                on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to=imageFileNamer)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    cv = models.FileField(upload_to=cvFileNamer)
