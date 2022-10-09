from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics


from .serializers import RegistrationSerializer

User = get_user_model()
# Create your views here.
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
class UsersList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


