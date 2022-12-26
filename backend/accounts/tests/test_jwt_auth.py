from django.test import TestCase
from django.contrib.auth import get_user_model
import json

from faker import Faker

User = get_user_model()
fake = Faker()


class JwtAuthTest(TestCase):
    username = fake.name()
    password = fake.password()
    email = fake.email()

    @classmethod
    def setUpTestData(cls) -> None:
        user = User(username=cls.username, email=cls.email)
        user.set_password(cls.password)
        user.is_active = True
        user.save()
    
    def get_tokens(self):
        data = {"email": self.email, "password": self.password}
        response = self.client.post("/api/v1/accounts/token/",data)
        return json.loads(response.content)

    def test_obtain_token(self):
        response = self.client.post("/api/v1/accounts/token/")
        self.assertEqual(response.status_code, 400)
        data = {"email": self.email, "password": self.password}
        response = self.client.post("/api/v1/accounts/token/", data)
        self.assertEqual(response.status_code, 200)

    def test_refresh_token(self):
        #failed request
        response = self.client.post("/api/v1/accounts/token/refresh/")
        self.assertEqual(response.status_code,400)
        #succeeded request
        tokens = self.get_tokens()
        data={"refresh":tokens.get("refresh")}
        response = self.client.post("/api/v1/accounts/token/refresh/",data)
        self.assertEqual(response.status_code,200)
        self.assertTrue("refresh" in str(response.content))
        self.assertTrue("access" in str(response.content))
    def test_verify_token(self):
        tokens = self.get_tokens()
        data = {"token":tokens["access"]}
        response = self.client.post("/api/v1/accounts/token/verify/",data)
        self.assertEqual(response.status_code,200)
        data = {"token":tokens["refresh"]}
        response = self.client.post("/api/v1/accounts/token/verify/",data)
        self.assertEqual(response.status_code,200)


