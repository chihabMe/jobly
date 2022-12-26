from django.test import TestCase
from django.contrib.auth import get_user_model
from faker import Faker

# Create your tests here.

User = get_user_model()
fake = Faker()


class UserTest(TestCase):
    user_username = fake.name()
    user_password = fake.password()
    user_email = fake.email()

    @classmethod
    def setUpTestData(cls) -> None:
        user = User(username=cls.user_username, email=cls.user_email)
        user.set_password(cls.user_password)
        user.save()

    def get_first_user(self):
        return User.objects.all().first()

    def test_users_count(self):
        self.assertEqual(User.objects.count(), 1)

    def test_username(self):
        user = self.get_first_user()
        self.assertEqual(user.username, self.user_username)

    def test_email(self):
        user = self.get_first_user()
        self.assertEqual(user.email, self.user_email)

    def test_password(self):
        user = self.get_first_user()
        self.assertTrue(user.check_password(self.user_password))
