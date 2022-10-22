from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from requests import request
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser

from accounts.models import Employee, EmployeeProfile
from accounts.permissions import IsProfileOwner

from .serializers import (CompanySerializer, EmployeeProfileSerializer,
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
    profile = request.user.employee_profile
    serializer = EmployeeProfileSerializer(profile, context={"request": request})
    return Response(serializer.data)


class EmployeeProfileView(generics.RetrieveUpdateAPIView):
    queryset = EmployeeProfile.objects.all()
    serializer_class=EmployeeProfileSerializer
    permission_classes=[IsProfileOwner]
    parser_classes = [MultiPartParser,FormParser]
    


    def get_object(self):
        obj = get_object_or_404(self.queryset,user=self.request.user) 
        self.check_object_permissions(self.request,obj)
        return obj


