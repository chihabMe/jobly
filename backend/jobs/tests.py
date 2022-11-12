# Create your tests here.
from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Job

User = get_user_model()


class JobTest(TestCase):
    ##user
    username = "username"
    email = "user@email.com"
    password = "password"
    # job
    title = "a job title "
    description = "a job description "
    salary = 1234
    introduction = "a job introduction "
    positions = 123

    def setUp(cls):

        user = User(email=cls.email, username=cls.username)
        user.set_password(cls.password)
        user.save()

        job = Job(
            title=cls.title,
            description=cls.description,
            salary=cls.salary,
            introduction=cls.introduction,
            positions=cls.positions,
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
