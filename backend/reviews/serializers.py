from rest_framework import serializers

from .models import Review


class CompanyReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.name")
    helpful_with_yes = serializers.IntegerField(read_only=True)
    helpful_with_no = serializers.IntegerField(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "body",
            "rate",
            "helpful_with_yes",
            "helpful_with_no",
            "user",
            "created",
            "updated",
        ]

    def create(self, validated_data):
        review = Review(**validated_data)
        review.user = self.context["user"]
        review.company = self.context["company"]
        review.save()
        return review

    def update(self, instance, validated_data):
        print(validated_data)
        instance.body = validated_data.get("body", instance.body)
        instance.rate = validated_data.get("rate", instance.rate)
        instance.save()
        return instance
