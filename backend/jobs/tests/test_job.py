#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Job

User = get_user_model()


class JobTest(TestCase):
    @classmethod
    def setUp(cls):
        ##user
        username = "username"
        email = "user@email.com"
        password = "password"

        user = User(email=email, username=username)
        user.set_password(password)
        user.save()

        # job
        title = "a job title "
        description = "a job description "
        salary = 12345
        introduction = "a job introduction "
        positoins = 123

        job = Job(
            title=title,
            description=description,
            salary=salary,
            introduction=introduction,
            positions=positoins,
            user=user,
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
