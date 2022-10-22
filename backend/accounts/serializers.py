from pkg_resources import require
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmployeeProfile,CompanyProfile
from .validators import validate_file_extension

User = get_user_model()


class EmployeeProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    cv = serializers.FileField(required=False,validators=[validate_file_extension])
    name = serializers.CharField(required=False)
    email = serializers.CharField(source="user.email",read_only=True)
    location = serializers.CharField(required=False,source="location.name",read_only=False)

    class Meta:
        model = EmployeeProfile
        fields = ("name", 'image',"cv","email","location" )

    def update(self, instance, validated_data):
        print(validated_data)
        instance.cv = validated_data.get('cv',instance.cv)
        instance.name = validated_data.get('name',instance.name)
        instance.image = validated_data.get('name',instance.image)
        instance.save()
        return instance
    


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
