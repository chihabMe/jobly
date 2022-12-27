#!/usr/bin/env python
# -*- coding: utf-8 -*-
from accounts.models import CompanyProfile
from django.contrib.auth import get_user_model
from django.test import TestCase
from faker import Faker
from jobs.models import Job
from locations.models import Location

User = get_user_model()
fake = Faker()


class JobTest(TestCase):
    # user
    username = fake.name()
    email = fake.email()
    password = fake.password()
    # location
    location = fake.local_latlng()[-1]
    # company

    description = fake.text()
    # phone = fake.ssn()
    phone = "711119632"
    website = fake.url()
    location = fake.local_latlng()[-1]
    number_of_employees = fake.random_int()
    # job

    title = fake.text()
    description = fake.text()
    salary = fake.random_int()
    introduction = fake.text()
    positions = fake.random_int()
    # user

    # @classmethod
    def setUp(cls) -> None:
        # user
        user = User(id=1, email=cls.email, username=cls.username)
        user.set_password(cls.password)
        user.save()
        # location
        location = Location(id=1, user=user, number=1, name=cls.location)
        location.save()
        # company

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
        # job
        job = Job(
            id=1,
            location=location,
            company_id=1,
            user=user,
            title=cls.title,
            description=cls.description,
            salary=cls.salary,
            introduction=cls.introduction,
            positions=cls.positions,
        )
        job.save()

    def test_job_title(self):
        job = Job.objects.get(id=1)
        self.assertEqual(job.title, self.title)

    def test_job_description(self):
        job = Job.objects.get(id=1)
        self.assertEqual(job.description, self.description)

    def test_job_introduction(self):
        job = Job.objects.get(id=1)
        self.assertEqual(job.introduction, self.introduction)

    def test_job_salary(self):
        job = Job.objects.get(id=1)
        self.assertEqual(job.salary, self.salary)

    def test_job_user(self):
        job = Job.objects.get(id=1)
        user = User.objects.get(id=1)
        self.assertEqual(job.user, user)

    def test_job_positions(self):
        job = Job.objects.get(id=1)
        self.assertEqual(job.positions, self.positions)
