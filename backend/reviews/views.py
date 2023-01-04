from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import CompanyProfile

from .models import Review
from .permissions import isReviewOwnerOrReadOnly
from .serializers import CompanyReviewSerializer

# Create your views here.

# class CompanyReviews(ListCreateAPIView):
#     queryset = CompanyProfile.objects.all()
#     serializer_class=
@api_view(["GET", "PUT"])
@permission_classes([isReviewOwnerOrReadOnly])
def company_reviews(request, company_slug):
    company = get_object_or_404(CompanyProfile, slug=company_slug)
    if request.method == "GET":
        reviews = Review.objects.filter(company=company)
        reviews = CompanyReviewSerializer(reviews, many=True)
        return Response(status=status.HTTP_200_OK, data=reviews.data)

    context = {
        "request": request,
        "company": company,
        "user": request.user.employee_profile,
    }
    request.data["user"] = request.user.employee_profile.id
    review = CompanyReviewSerializer(data=request.data, context=context)
    if review.is_valid():
        queryset = Review.objects.filter(
            user=request.user.employee_profile, company=company
        )
        if not queryset.exists():
            instance = Review.objects.create(
                body="", rate=1, company=company, user=request.user.employee_profile
            )
        else:
            instance = queryset.first()
        review.update(instance=instance, validated_data=review.validated_data)
        return Response(status=status.HTTP_201_CREATED, data=review.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=review.errors)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_review(request, company_slug):
    company = get_object_or_404(CompanyProfile, slug=company_slug)
    review = get_object_or_404(
        Review, user=request.user.employee_profile, company=company
    )
    review = CompanyReviewSerializer(review)
    return Response(status=status.HTTP_200_OK, data=review.data)
