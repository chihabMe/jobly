#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.urls import path

from .views import JobsDetailsView, JobsListView, job_apply_view, job_bookmark

app_name = "jobs"

urlpatterns = [
    path("", JobsListView.as_view(), name="jobs_list"),
    path("<slug:slug>/apply/", job_apply_view, name="job_apply"),
    path("<slug:slug>/book-mark/", job_bookmark, name="job_bookmark"),
    path("<slug:slug>/", JobsDetailsView.as_view(), name="job_details"),
]
