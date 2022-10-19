from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import LocationSerializer
from .models import Location

# Create your views here.


class LocationsView(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
