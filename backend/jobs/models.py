from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


# Create your models here.
class JobManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class Job(models.Model):
    title = models.CharField(max_length=200)
    positions = models.IntegerField(default=1)
    slug = models.SlugField(blank=True, unique=True)
    introduction = models.CharField(max_length=500)
    description = models.TextField()
    salary = models.IntegerField('monthly salary')
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User,
                             related_name='posted_jobs',
                             on_delete=models.CASCADE)
    objects = JobManager()

    #overriding the save method
    def save(self, *args, **kwargs):
        self.slug = self.user.username + "-" + slugify(self.title) + "-" + str(
            self.salary)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
