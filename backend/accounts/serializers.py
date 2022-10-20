from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    slug = serializers.SlugField('slug')

    class Meta:
        model = Profile
        fields = ("name", 'image', 'slug')

    def get_image(self, profile):
        request = self.context.get("request")
        if request:
            if profile.image:
                return request.build_absolute_uri(profile.image.url)
        return None


class CompanySerializer(ProfileSerializer):
    employees_count = serializers.CharField(source='get_employees_count')
    open_jobs_count = serializers.CharField(source='get_open_jobs_count')

    class Meta:
        model = Profile
        fields = ("name", 'image', 'slug', 'description', 'employees_count',
                  'open_jobs_count')


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
