from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics

from accounts.models import Profile


from .serializers import ProfileSerializer, RegistrationSerializer

User = get_user_model()
# Create your views here.
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
class UsersList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


class ProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all() 
    lookup_field='name'
    serializer_class = ProfileSerializer