from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmployeeProfile,CompanyProfile

User = get_user_model()


class EmployeeProfileSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    cv = serializers.SerializerMethodField()
    email = serializers.CharField(source="user.email",read_only=True)
    location = serializers.CharField(source="location.name",read_only=True)

    class Meta:
        model = EmployeeProfile
        fields = ("name", 'image',"cv","email","location" )

    def get_image(self, profile):
        request = self.context.get("request")
        if profile.image:
            return request.build_absolute_uri(profile.image.url)
        return None
    def get_cv(self, profile):
        request = self.context.get("request")
        if profile.cv:
            return request.build_absolute_uri(profile.cv.url)
        return None


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyProfile
        fields = ("name", 'image', 'slug', 'description', 'number_of_employees',
                  )
    def get_image(self, profile):
        request = self.context.get("request")
        if profile.image:
            return request.build_absolute_uri(profile.image.url)
        return None


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "re_password")

    def validate(self, attrs):
        if (attrs.get("password") != attrs.get("re_password")):
            error = "passwords does'nt match"
            raise serializers.ValidationError({
                "password": error,
                "re_password": error
            })
        return attrs

    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password")
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return user
