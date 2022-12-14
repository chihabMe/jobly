# -*- coding: utf-8 -*-
from accounts.models import CompanyProfile, CompanyRate, EmployeeProfile
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils.text import slugify
from faker import Faker
from locations.models import Location

User = get_user_model()
fake = Faker()


class CompanyRateTest(TestCase):

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
    # rate
    rate = 4

    @classmethod
    def setUpTestData(cls):
        user = User(id=1, username=cls.username, email=cls.username)
        user.set_password(cls.password)
        user.save()

        # create a location
        location = Location(id=1, number=1, name=cls.location, user=user)
        location.save()
        # create a profile
        company = CompanyProfile(
            id=1,
            user=user,
            location=location,
            description=cls.description,
            phone=cls.phone,
            website=cls.website,
            number_of_employees=cls.number_of_employees,
        )
        company.save()

        profile = user.employee_profile
        profile.location = location
        profile.phone = cls.phone
        profile.save()
        # rate
        rate = CompanyRate(rate=cls.rate, rater=profile, rated_company=company)
        rate.save()

    def test_rates_count(self):
        self.assertEqual(1, CompanyRate.objects.all().count())

    def test_rate_score(self):
        rate = CompanyRate.objects.get(id=1)
        self.assertEqual(self.rate, rate.rate)

    def test_rate_company(self):
        rate = CompanyRate.objects.get(id=1)
        company = CompanyProfile.objects.get(id=1)
        self.assertEqual(rate.rated_company, company)

    def test_rate_ratyr(self):
        rate = CompanyRate.objects.get(id=1)
        employee = EmployeeProfile.objects.get(id=1)
        self.assertEqual(rate.rater, employee)
