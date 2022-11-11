from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from requests import request
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from accounts.models import Employee, EmployeeProfile,CompanyProfile
from accounts.permissions import IsProfileOwner

from .serializers import (CompanyProfileSerializer, EmployeeProfileSerializer,
                          RegistrationSerializer)


User = get_user_model()


# Create your views here.
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


class CompanyProfileView(generics.RetrieveUpdateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class=EmployeeProfileSerializer
    permission_classes=[IsProfileOwner]
    parser_classes = [MultiPartParser,FormParser]
    def get_object(self):
        obj = get_object_or_404(self.queryset,user=self.request.user)
        self.check_object_permissions(self.request,obj)
        return obj
    def retrieve(self,request,*args, **kwargs):
        if request.user.type!=User.Types.COMPANY:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return super().retrieve(request,*args, **kwargs)


class EmployeeProfileView(generics.RetrieveUpdateAPIView):
    queryset = EmployeeProfile.objects.all()
    serializer_class=CompanyProfileSerializer
    permission_classes=[IsProfileOwner]
    parser_classes = [MultiPartParser,FormParser]
    def get_object(self):
        obj = get_object_or_404(self.queryset,user=self.request.user) 
        self.check_object_permissions(self.request,obj)
        return obj


