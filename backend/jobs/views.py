from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Job
from .permissions import IsOwnerOrReadOnly
from .serializers import JobsDetailsSerailizer, JobsListSerailizer

# Create your views here.


User = get_user_model()


class JobsListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobsListSerailizer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        q = self.request.GET.get("query") or ""
        location = self.request.GET.get("location") or ""
        queryset = super().get_queryset()
        queryset = queryset.search(query=q, location=location)
        return queryset

    def create(self, request, *args, **kwargs):
        user: User = self.request.user
        if user.type != User.Types.COMPANY:
            data = {
                "status": "error",
                "data": "your account is an employee account please create a company account  ",
            }
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)
        return super().create(request, *args, **kwargs)


class JobsDetailsView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "slug"
    queryset = Job.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = JobsDetailsSerailizer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def job_bookmark(request, slug):
    job = get_object_or_404(Job, slug=slug)
    profile = request.user.employee_profile
    data = {}
    data["action"] = "add"
    if job in profile.book_marked_jobs.all():
        data["action"] = "remove"
        profile.book_marked_jobs.remove(job)
        return Response(status=status.HTTP_200_OK, data=data)

    profile.book_marked_jobs.add(job)
    return Response(status=status.HTTP_201_CREATED, data=data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def job_apply_view(request, slug):
    job = get_object_or_404(Job, slug=slug)
    profile = request.user.employee_profile
    data = {}
    data["action"] = "add"
    if job in profile.applied_jobs.all():
        data["action"] = "remove"
        profile.applied_jobs.remove(job)
        return Response(status=status.HTTP_200_OK, data=data)

    profile.applied_jobs.add(job)
    return Response(status=status.HTTP_201_CREATED, data=data)
