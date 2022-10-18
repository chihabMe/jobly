from django.shortcuts import render
from rest_framework import generics

from .models import Job
from .serializers import JobsListSerailizer, JobsDetailsSerailizer

# Create your views here.


class JobsListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobsListSerailizer


class JobsDetailsView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    queryset = Job.objects.all()
    serializer_class = JobsDetailsSerailizer
