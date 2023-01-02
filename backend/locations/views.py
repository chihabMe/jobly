from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .dummy import locations
from .models import Location
from .serializers import LocationSerializer

# Create your views here.


@login_required
def initializeLocations(request):
    if request.user.is_superuser:
        i = 0
        for location in locations:
            i += 1
            try:
                id = location.get("id")
                lc = Location.objects.get(id=id)
                lc.delete()
            except:
                pass
            name = location.get("name")
            Location.objects.create(id=id, name=name, number=id, user=request.user)
        return HttpResponse(f"{i} locations")
    return HttpResponse("unauthorized")


class LocationsView(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
