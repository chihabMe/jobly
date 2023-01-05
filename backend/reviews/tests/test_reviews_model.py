from django.test import TestCase
from mixer.backend.django import faker

from accounts.models import CompanyProfile, EmployeeProfile
from reviews.models import Review

# class TestReviewsModel(TestCase):
# @classmethod
# def setUpTestData(cls) -> None:

# def test_employee_creation(self):
#     self.assertEqual(EmployeeProfile.objects.count(), 1)

# def test_review_creation(self):
#     self.assertEqual(Review.objects.all().count(), 1)
