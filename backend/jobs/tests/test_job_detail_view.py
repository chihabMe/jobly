from accounts.models import CompanyProfile
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from faker import Faker
from jobs.models import Job
from locations.models import Location
from mixer.backend.django import mixer
from rest_framework.reverse import reverse
from rest_framework.test import APIClient

fake = Faker()
User = get_user_model()


class JobDetailViewTest(TestCase):
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

    @classmethod
    def setUpTestData(cls) -> None:
        # user
        user = User(id=1, email=cls.email, username=cls.username)
        user.set_password(cls.password)
        user.is_active = True
        user.type = User.Types.COMPANY
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
            created=timezone.now(),
        )
        company.save()
        # job
        job = Job(
            id=1,
            location=location,
            company=company,
            user=user,
            title=cls.title,
            description=cls.description,
            salary=cls.salary,
            introduction=cls.introduction,
            positions=cls.positions,
        )
        job.save()
        # using DRF api client
        cls.client = APIClient()

    def test_jobs_count(self):
        count = Job.objects.all().count()
        self.assertEqual(1, count)

    def test_job_detail_get(self):
        job: Job = Job.objects.first()
        url = reverse("jobs:job_details", args=[job.slug])
        response = self.client.get(url)
        # test status code
        self.assertEqual(response.status_code, 200)
        # testing the received data
        data = response.json()
        # test the title
        self.assertEqual(job.title, data["title"])
        # test the description
        self.assertEqual(job.description, data["description"])
        # test the introduction
        self.assertEqual(job.introduction, data["introduction"])
        # test the positions
        self.assertEqual(job.positions, data["positions"])
        # test the slug
        self.assertEqual(job.slug, data["slug"])
        # test the salary
        self.assertEqual(job.salary, data["salary"])
        # test the location
        self.assertEqual(job.location.name, data["location"])

    def test_job_detail_put(self):
        job: Job = Job.objects.first()
        url = reverse("jobs:job_details", args=[job.slug])
        data = {
            "title": "job title",
            "introduction": "job introduction",
            "description": "job description",
            "salary": 1000,
            "positions": 1,
        }
        self.client.login(email=self.email, password=self.password)

        response = self.client.put(url, data=data, content_type="application/json")
        res_data = response.json()
        # testing the status code
        self.assertEqual(response.status_code, 200)
        # testing the new title
        self.assertEqual(data["title"], res_data["title"])
        self.assertEqual(data["positions"], res_data["positions"])
        self.assertEqual(data["salary"], res_data["salary"])
        self.assertEqual(data["description"], res_data["description"])
        self.assertEqual(data["introduction"], res_data["introduction"])

    def test_job_detail_delete(self):
        job: Job = Job.objects.first()
        url = reverse("jobs:job_details", args=[job.slug])
        self.client.login(email=self.email, password=self.password)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        # testing the database
        self.assertFalse(Job.objects.filter(slug=job.slug).exists())
