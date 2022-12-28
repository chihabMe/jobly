#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.test import TestCase
from django.contrib.auth import get_user_model
from faker import Faker
from django.utils.text import slugify

from accounts.models import CompanyProfile
from locations.models import Location

User = get_user_model()
fake = Faker()


class CompanyProfileTest(TestCase):

    # user
    username = fake.name()
    email = fake.email()
    password = fake.password()
    # company profile
    description = fake.text()
    # phone = fake.ssn()
    phone = "711119632"
    website = fake.url()
    location = fake.local_latlng()[-1]
    number_of_employees = fake.random_int()

    @classmethod
    def setUpTestData(cls):
        user = User(id=1, username=cls.username, email=cls.username)
        user.set_password(cls.password)
        user.save()
        # create a location
        location = Location(id=1, number=1, name=cls.location, user=user)
        location.save()
        # create a profile
        profile = CompanyProfile(
            id=1,
            user=user,
            location=location,
            description=cls.description,
            phone=cls.phone,
            website=cls.website,
            number_of_employees=cls.number_of_employees,
        )
        profile.save()

    def get_first_user(self):
        return User.objects.all().first()

    def get_first_profile(self):
        return CompanyProfile.objects.all().first()

    def test_company_profiles_count(self):
        self.assertEqual(CompanyProfile.objects.all().count(), 1)

    def test_company_profile_user(self):
        profile = self.get_first_profile()
        user = self.get_first_user()
        self.assertEqual(user.id, profile.user.id)

    def test_company_profile_location(self):
        profile = self.get_first_profile()
        self.assertEqual(self.location, profile.location.name)

    def test_company_profile_phone(self):
        profile = self.get_first_profile()
        self.assertEqual(self.phone, profile.phone)

    def test_company_profile_website(self):
        profile = self.get_first_profile()
        self.assertTrue(self.website == profile.website)

    def test_company_profile_website(self):
        profile = self.get_first_profile()
        self.assertTrue(self.website == profile.website)

    def test_company_profile_description(self):
        profile = self.get_first_profile()
        self.assertTrue(self.description == profile.description)

    # def test_company_profile_slug(self):
    #     profile = self.get_first_profile()
    #     slug = slugify(self.username)
    #     self.assertEqual(slug, profile.slug)

    def test_company_profile_number_of_employees(self):
        profile = self.get_first_profile()
        self.assertEqual(profile.number_of_employees, self.number_of_employees)
