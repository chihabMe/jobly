from accounts.models import CompanyProfile, CustomUser, Employee, EmployeeProfile
from accounts.permissions import IsProfileOwner
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from jobs.models import Job
from jobs.permissions import IsOwnerOrReadOnly
from jobs.serializers import JobsListSerailizer
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import (
    CompanyProfileSerializer,
    EmployeeProfileSerializer,
    RegistrationSerializer,
)

User: CustomUser = get_user_model()


# Create your views here.
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_account_type_change(request):
    user: CustomUser = request.user
    type: str = request.data.get("type", None)
    res_status = status.HTTP_400_BAD_REQUEST
    if type is None:
        return Response(status=res_status)

    data = {}
    data["message"] = "you are already a  " + type
    if (
        type is not None
        and user.type == User.Types.COMPANY
        and type.upper() == User.Types.EMPLOYEE
    ):
        user.type = User.Types.EMPLOYEE
        if not EmployeeProfile.objects.filter(user=user).exists():
            profile = EmployeeProfile.objects.create(user=user)
        res_status = status.HTTP_200_OK
        data["message"] = "change to a " + type
        user.save()
    elif (
        type is not None
        and user.type == User.Types.EMPLOYEE
        and type.upper() == User.Types.COMPANY
    ):
        user.type = User.Types.COMPANY
        if not CompanyProfile.objects.filter(user=user).exists():
            profile = CompanyProfile.objects.create(user=user)
        data["message"] = "change to a " + type
        res_status = status.HTTP_200_OK
        user.save()
    return Response(status=res_status, data=data)


class CurrentUserProfileView(generics.RetrieveUpdateAPIView):
    # queryset = EmployeeProfile.objects.all()
    permission_classes = [IsAuthenticated, IsProfileOwner]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self, *args, **kwargs):
        print("fuck of ")
        # checking for the user type and returning a proper serializer to handle it
        if self.request.user.type == User.Types.COMPANY:
            return CompanyProfileSerializer
        return EmployeeProfileSerializer

    def get_queryset(self):
        # checking for the user type and returning a  profiles query sets based for each type
        if self.request.user.type == User.Types.COMPANY:
            qs = CompanyProfile.objects.all()
        else:
            qs = EmployeeProfile.objects.all()
        return qs

    def get_object(self):
        # getting the current authenticated profile by using the user attr
        obj = get_object_or_404(self.get_queryset(), user=self.request.user)
        # checking for permissions
        obj = self.get_queryset().get(user=self.request.user)
        self.check_object_permissions(self.request, obj)
        return obj


class CompanyJobs(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobsListSerailizer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = "slug"
    pagination_class = PageNumberPagination


# def company_profile_detail(request):
class CompanyDetailView(generics.RetrieveAPIView):
    queryset = CompanyProfile.objects.all()
    lookup_field = "slug"
    serializer_class = CompanyProfileSerializer
