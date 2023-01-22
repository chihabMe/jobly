from django.conf import settings
from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer as DefaultUserSerializer
from rest_framework import serializers

#  'current_user': 'djoser.serializers.UserSerializer',

User = get_user_model()


class UserSerializer(DefaultUserSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "id", "type"]
