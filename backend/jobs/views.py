from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated  ,IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .models import Job
from .serializers import JobsListSerailizer, JobsDetailsSerailizer


# Create your views here.


class JobsListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobsListSerailizer
    permission_classes=[IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        q = self.request.GET.get("query") or ""
        location = self.request.GET.get("location") or ""
        print("---------")
        print(q)
        print(location)
        print("---------")
        queryset = super().get_queryset()
        queryset = queryset.search(query=q,location=location)
        return queryset
    


class JobsDetailsView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    queryset = Job.objects.all()
    serializer_class = JobsDetailsSerailizer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def job_bookmark(request,slug):
    job  = get_object_or_404(Job,slug=slug)
    profile =request.user.employee_profile
    data = {}
    data["action"]="add"
    if job in profile.book_marked_jobs.all():
        data['action']='remove'
        profile.book_marked_jobs.remove(job)
        return Response(status=status.HTTP_200_OK,data=data)

    profile.book_marked_jobs.add(job)
    return Response(status=status.HTTP_201_CREATED,data=data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def job_apply_view(request,slug):
    job  = get_object_or_404(Job,slug=slug)
    profile =request.user.employee_profile
    print(request.user)
    data = {}
    data["action"]="add"
    if job in profile.applied_jobs.all():
        data['action']='remove'
        profile.applied_jobs.remove(job)
        return Response(status=status.HTTP_200_OK,data=data)

    profile.applied_jobs.add(job)
    return Response(status=status.HTTP_201_CREATED,data=data)

