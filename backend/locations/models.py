from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User,
                             related_name="added_locations",
                             on_delete=models.CASCADE)
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.name
