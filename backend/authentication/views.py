from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from djoser.urls import jwt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenVerifyView

# Create your views here.


@api_view(["GET"])
def get_csrf(request):
    headers = {}
    data = {}
    data["status"] = "success"
    headers["X-CSRFToken"] = get_token(request)
    return Response(data=data, headers=headers)


@api_view(["POST"])
def loginView(request):
    email = request.data.get("email", None)
    password = request.data.get("password", None)
    data = {}
    data["data"] = "your are logged in "
    data["status"] = "success"
    if email is None or password is None:
        data["status"] = "error"
        data["data"] = "email and password fields are required"
        return Response(status=status.HTTP_400_BAD_REQUEST, data=data)
    user = authenticate(email=email, password=password)
    if user is None:
        data["status"] = "error"
        data["data"] = "please check your email and password"
        return Response(status=status.HTTP_400_BAD_REQUEST, data=data)
    login(request, user)
    return Response(status=status.HTTP_200_OK)
