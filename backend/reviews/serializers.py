from rest_framework import serializers

from .models import Review


class CompanyReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "body", "rate", "user", "created", "updated"]

    def create(self, validated_data):
        review = Review(**validated_data)
        review.user = self.context["user"]
        review.company = self.context["company"]
        review.save()
        return review

    def update(self, instance, validated_data):
        instance.body = validated_data.get("body", instance.body)
        instance.rate = validated_data.get("rate", instance.rate)
        return instance
