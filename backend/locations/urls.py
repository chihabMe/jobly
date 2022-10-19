#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.urls import path
from .views import LocationsView

app_name = 'locations'

urlpatterns = [path('', LocationsView.as_view(), name='locations')]
