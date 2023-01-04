from django.db import models

from accounts.models import CompanyProfile, EmployeeProfile


class Review(models.Model):
    body = models.TextField()
    rate = models.PositiveIntegerField()
    company = models.ForeignKey(
        CompanyProfile, related_name="reviews", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        EmployeeProfile, related_name="reviews", on_delete=models.CASCADE
    )
    helpful_with_yes = models.IntegerField(default=0)
    helpful_with_no = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user) + " reviewed " + str(self.company)

    class Meta:
        ordering = ("-created", "-updated")
