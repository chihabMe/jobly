#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .views import JobsListView, JobsDetailsView, job_apply_view, job_bookmark
from django.urls import path

app_name = "jobs"

urlpatterns = [
    path("", JobsListView.as_view(), name="jobs"),
    path("<slug:slug>/apply/", job_apply_view, name="job_apply"),
    path("<slug:slug>/book-mark/", job_bookmark, name="job_apply"),
    path("<slug:slug>/", JobsDetailsView.as_view(), name="job_details"),
]
