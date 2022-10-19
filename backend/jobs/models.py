from random import randint

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify
from locations.models import Location

User = get_user_model()


# Create your models here.
class JobManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class Job(models.Model):
    title = models.CharField(max_length=200)
    positions = models.IntegerField(default=1)
    slug = models.SlugField(blank=True, unique=True, null=True)
    introduction = models.CharField(max_length=500)
    description = models.TextField()
    salary = models.IntegerField('monthly salary')
    active = models.BooleanField(default=True)
    location = models.ForeignKey(Location,
                                 default=16,
                                 related_name='jobs',
                                 on_delete=models.CASCADE)
    user = models.ForeignKey(User,
                             related_name='posted_jobs',
                             on_delete=models.CASCADE)
    objects = JobManager()

    ##overriding the save method
    #def save(self, *args, **kwargs):
    #    # self.slug = self.user.username + "-" + slugify(self.title) + "-" + str(
    #        self.salary)
    #    super().save(*args, **kwargs)

    def __str__(self):
        return self.title


@receiver(pre_save, sender=Job)
def job_slug(sender, instance, **kwargs):
    print("run----------")
    slug = slugify(instance.user.username + "-" + instance.title)
    results = Job.objects.filter(slug=slug)
    created = kwargs.get('created')
    print(kwargs)
    print(created)
    print(slug)
    if results.count() == 1 and instance.title == results.first(
    ).title and created == False:
        print(results.count())
        instance.slug = slug
        print(instance == results.first())
        print(slug)
        return instance

    exists = results.exists()

    num = 0
    while exists:
        new_slug = slug + '-' + str(num)
        exists = Job.objects.filter(slug=new_slug).exists()
        print(new_slug)
        if not exists:
            slug = new_slug
        num += 1
    instance.slug = slug
    print(instance.slug)
    return instance
