from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from accounts.models import CompanyProfile

from .models import Review
from .serializers import CompanyReviewSerializer

# Create your views here.

# class CompanyReviews(ListCreateAPIView):
#     queryset = CompanyProfile.objects.all()
#     serializer_class=
@api_view(["GET", "POST"])
def company_reviews(request, company_slug):
    company = get_object_or_404(CompanyProfile, slug=company_slug)
    if request.method == "GET":
        reviews = Review.objects.filter(company=company)
        reviews = CompanyReviewSerializer(reviews, many=True)
        return Response(status=status.HTTP_200_OK, data=reviews.data)

    if request.user.employee_profile.reviews.filter(company=company).exists():
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={
                "error": "you can't review the same company twice but you can delete your review or update it "
            },
        )

    context = {
        "request": request,
        "company": company,
        "user": request.user.employee_profile,
    }
    request.data["user"] = request.user.employee_profile.id
    review = CompanyReviewSerializer(data=request.data, context=context)
    if review.is_valid():
        review.save()
        return Response(status=status.HTTP_201_CREATED, data=review.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=review.errors)
