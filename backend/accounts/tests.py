from django.test import TestCase
from django.contrib.auth import get_user_model

# Create your tests here.

User = get_user_model()
class UserTest(TestCase):
    user_username = "test_user"
    user_password = "test_password"
    user_email  = "test_email@email.com"
    @classmethod
    def setUpTestData(cls) -> None:
        user = User(username=cls.user_username,email=cls.user_email)
        user.set_password(cls.user_password)
        user.save()
    def test_users_count(self):
        self.assertEqual(User.objects.count(),1)
    def test_username(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.username,self.user_username)
    def test_email(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.email,self.user_email)
    def test_password(self):
        user = User.objects.get(id=1)
        self.assertTrue(user.check_password(self.user_password))
        

