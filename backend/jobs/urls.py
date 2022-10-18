#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .views import JobsListView, JobsDetailsView
from django.urls import path

app_name = 'jobs'

urlpatterns = [
    path("", JobsListView.as_view(), name='jobs'),
    path("<slug:slug>/", JobsDetailsView.as_view(), name='job_details'),
]
