from accounts.models import Profile
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import (CompanySerializer, ProfileSerializer,
                          RegistrationSerializer)

User = get_user_model()


# Create your views here.
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


class UsersList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def authenticated_user_view(request):
    profile = request.user.profile
    serializer = ProfileSerializer(profile, context={"request": request})
    return Response(serializer.data)


class AuthenticatedUserView(generics.GenericAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return get_object_or_404(Profile, id=self.request.user.id)

    def get(self, request):
        user = self.get_queryset()
        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)


class CompanyView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    lookup_field = 'name'
    serializer_class = CompanySerializer
