#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.test import TestCase
from django.contrib.auth import get_user_model
from faker import Faker
from django.utils.text import slugify

from accounts.models import EmployeeProfile
from locations.models import Location


User = get_user_model()
fake = Faker()


class EmployeeProfileTest(TestCase):

    # user
    username = fake.name()
    email = fake.email()
    password = fake.password()
    # employee profile
    # phone = fake.ssn()
    phone = "711119632"
    location = fake.local_latlng()[-1]

    @classmethod
    def setUpTestData(cls):

        user = User(id=1, username=cls.username, email=cls.username)
        user.set_password(cls.password)
        user.save()
    #     # create a location
        location = Location(id=1, number=1, name=cls.location, user=user)
        location.save()
    #     # create a profile
        profile = user.employee_profile
        profile.location = location
        profile.phone = cls.phone
        profile.save()

    def get_first_user(self):
        return User.objects.all().first()

    def get_first_profile(self):
        return EmployeeProfile.objects.all().first()

    def test_employee_profiles_count(self):
        self.assertEqual(EmployeeProfile.objects.all().count(),1)

    def test_employee_profile_user(self):
        profile = self.get_first_profile()
        user = self.get_first_user()
        self.assertEqual(user.id, profile.user.id)

    def test_employee_profile_location(self):
        profile = self.get_first_profile()
        self.assertEqual(self.location, profile.location.name)

    def test_employee_profile_phone(self):
        profile = self.get_first_profile()
        self.assertEqual(self.phone, profile.phone)

    def test_employee_profile_applied_jobs(self):
        profile = self.get_first_profile()
        self.assertEqual(profile.applied_jobs.all().count(), 0)

    def test_employee_profile_book_marked_jobs(self):
        profile = self.get_first_profile()
        self.assertEqual(profile.book_marked_jobs.all().count(), 0)
