from accounts.models import CompanyProfile
from django.contrib.auth import get_user_model
from django.test import TestCase
from jobs.models import Job
from jobs.views import JobsListView
from locations.models import Location
from mixer.backend.django import mixer
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()
factory = APIRequestFactory()


class JobListViewTest(TestCase):
    email = "test@email.com"
    username = "testusername"
    password = "testpassword"

    @classmethod
    def setUpTestData(cls):
        # creating 5 jobs
        cls.count = 5
        for i in range(cls.count):
            mixer.blend(Job)
        # creating a compnay
        location = mixer.blend(Location)
        company = mixer.blend(CompanyProfile, location=location)
        # creating an active user for testing(needed to obtain jwt tokens)
        user = User(email=cls.email, username=cls.username)
        user.set_password(cls.password)
        user.is_active = True
        user.type = user.Types.COMPANY
        user.company_profile = company
        user.save()
        # using rest framework clint instead of django request clint
        cls.client = APIClient()

    def get_first_job(self) -> Job:
        return Job.objects.first()

    def get_tokens(self) -> dict[str, str]:
        data = {"email": self.email, "password": self.password}
        response = self.client.post("/api/v1/accounts/token/", data)
        return response.json()

    def test_jobs_list_view_response(self):
        url = reverse("jobs:jobs_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_jobs_list_view_count(self):
        url = reverse("jobs:jobs_list")
        response = self.client.get(url)
        data = response.json()
        self.assertEqual(self.count, data.get("count"))
        self.assertEqual(self.count, len(data["results"]))

    def test_jobs_list_view_result(self):
        url = reverse("jobs:jobs_list")
        response = self.client.get(url)
        data: Job = response.json()["results"][0]
        job = self.get_first_job()
        self.assertEqual(data["title"], job.title)
        self.assertEqual(data["introduction"], job.introduction)
        self.assertEqual(data["slug"], job.slug)

    def test_job_list_post_request(self):
        # tokens = self.get_tokens()
        # access=tokens.get("access")

        url = reverse("jobs:jobs_list")
        # headers = {
        #     "Authorization": f"Bearer {access}"
        # }
        data = {
            "title": "job title",
            "introduction": "job introduction",
            "description": "job description",
            "salary": 1000,
            "positions": 1,
        }
        ## unauthenticated user
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 401)
        ## authenticated user
        self.client.login(email=self.email, password=self.password)
        ##getting auth token
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 201)
        # test the received data
        res_data = response.json()
        self.assertEqual(data["title"], res_data["title"])
        self.assertEqual(data["positions"], res_data["positions"])
        self.assertEqual(data["salary"], res_data["salary"])
        self.assertEqual(False, res_data["book_marked"])
