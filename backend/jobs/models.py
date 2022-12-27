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
    title = models.CharField(max_length=200, blank=True)
    positions = models.IntegerField(default=1, blank=True)
    slug = models.SlugField(max_length=400, blank=True, unique=True, null=True)
    introduction = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    salary = models.IntegerField("monthly salary", blank=True)
    company = models.ForeignKey(
        "accounts.CompanyProfile",
        blank=True,
        related_name="jobs",
        on_delete=models.CASCADE,
    )
    active = models.BooleanField(default=True)
    location = models.ForeignKey(
        Location,
        default=1,
        null=True,
        blank=True,
        related_name="jobs",
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, related_name="posted_jobs", on_delete=models.CASCADE)

    objects = JobManager()

    # overriding the save method
    # def save(self, *args, **kwargs):
    #    # self.slug = self.user.username + "-" + slugify(self.title) + "-" + str(
    #        self.salary)
    #    super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("-created", "-update")


@receiver(pre_save, sender=Job)
def job_slug(sender, instance, **kwargs):
    slug = slugify(instance.user.username + "-" + instance.title)
    results = Job.objects.filter(slug=slug)
    created = kwargs.get("created")
    if (
        results.count() == 1
        and instance.title == results.first().title
        and created == False
    ):
        instance.slug = slug
        return instance

    exists = results.exists()

    num = 0
    while exists:
        new_slug = slug + "-" + str(num)
        exists = Job.objects.filter(slug=new_slug).exists()
        if not exists:
            slug = new_slug
        num += 1
    instance.slug = slug
    return instance
