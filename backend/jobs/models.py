from random import randint

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify
from locations.models import Location
from django.db.models import Q

User = get_user_model()


# Create your models here.
class JobQuerySet(models.QuerySet):
    def is_public(self):
        return self.filter(active=True)

    def search(self, query=None, location=None):
        lookup = Q(location__name__icontains=location) & Q(
            Q(title__icontains=query)
            | Q(introduction__icontains=query)
            | Q(description__icontains=query)
        )
        return self.filter(lookup)


class JobManager(models.Manager):
    def search(self, query=None, location=None):
        if query == None and location == None:
            return self.get_queryset()
        return self.get_queryset().search(query, location)

    def get_queryset(self):
        return JobQuerySet(self.model, using=self._db).is_public()


class Job(models.Model):
    title = models.CharField(max_length=200)
    positions = models.IntegerField(default=1)
    slug = models.SlugField(max_length=400, blank=True, unique=True, null=True)
    introduction = models.CharField(max_length=500)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    salary = models.IntegerField("monthly salary")
    company = models.ForeignKey(
        "accounts.CompanyProfile", related_name="jobs", on_delete=models.CASCADE
    )
    active = models.BooleanField(default=True)
    location = models.ForeignKey(
        Location,  related_name="jobs", on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, related_name="posted_jobs", on_delete=models.CASCADE)

    objects = JobManager()

    ##overriding the save method
    # def save(self, *args, **kwargs):
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
    created = kwargs.get("created")
    print(kwargs)
    print(created)
    print(slug)
    if (
        results.count() == 1
        and instance.title == results.first().title
        and created == False
    ):
        print(results.count())
        instance.slug = slug
        print(instance == results.first())
        print(slug)
        return instance

    exists = results.exists()

    num = 0
    while exists:
        new_slug = slug + "-" + str(num)
        exists = Job.objects.filter(slug=new_slug).exists()
        print(new_slug)
        if not exists:
            slug = new_slug
        num += 1
    instance.slug = slug
    print(instance.slug)
    return instance
