from django.contrib.auth import get_user_model
from pkg_resources import require
from rest_framework import serializers

from .models import CompanyProfile, EmployeeProfile
from .validators import validate_file_extension

User = get_user_model()


class EmployeeProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    cv = serializers.FileField(required=False, validators=[validate_file_extension])
    name = serializers.CharField(required=False)
    email = serializers.CharField(source="user.email", read_only=True)
    type = serializers.CharField(source="user.type", read_only=True)
    location = serializers.CharField(
        required=False, source="location.name", read_only=False
    )
    applied_jobs = serializers.SerializerMethodField(read_only=True)
    book_marked_jobs = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EmployeeProfile
        fields = (
            "name",
            "image",
            "phone",
            "book_marked_jobs",
            "applied_jobs",
            "type",
            "cv",
            "email",
            "location",
        )

    def get_applied_jobs(self, profile):
        return profile.applied_jobs.count()

    def get_book_marked_jobs(self, profile):
        return profile.book_marked_jobs.count()

    def update(self, instance, validated_data):
        instance.cv = validated_data.get("cv", instance.cv)
        instance.name = validated_data.get("name", instance.name)
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance


class CompanyProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    name = serializers.CharField(required=False)
    email = serializers.CharField(source="user.email", read_only=True)
    location = serializers.CharField(
        required=False, source="location.name", read_only=False
    )
    jobs = serializers.SerializerMethodField()
    slug = serializers.SlugField(required=False)
    number_of_applied_users = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    number_of_raters = serializers.SerializerMethodField()
    type = serializers.CharField(source="user.type", read_only=True)

    class Meta:
        model = CompanyProfile
        fields = (
            "name",
            "image",
            "rating",
            "website",
            "number_of_raters",
            "slug",
            "description",
            "phone",
            "jobs",
            "number_of_applied_users",
            "number_of_employees",
            "type",
            "email",
            "location",
            "created",
        )

    def validate_number_of_employees(self, attrs):
        if attrs < 1:
            raise serializers.ValidationError("you have to have at lease 1 employee ")
        return attrs

    def get_number_of_raters(self, company_profile):
        return company_profile.rates.count()

    def get_rating(self, company_profile):
        total = sum(rate.rate for rate in company_profile.rates.all())
        total_rates = company_profile.rates.count()
        if total_rates > 0:
            res = total / total_rates
        else:
            res = 0
        return float(format(res, ".1f"))

    def get_jobs(self, company_profile):
        return company_profile.jobs.count()

    def get_number_of_applied_users(self, company_profile):
        return sum(job.applied_by.count() for job in company_profile.jobs.all())

    def update(self, instance: CompanyProfile, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.image = validated_data.get("image", instance.image)
        instance.description = validated_data.get("description", instance.description)
        instance.website = validated_data.get("website", instance.website)
        instance.number_of_employees = validated_data.get(
            "number_of_employees", instance.number_of_employees
        )
        instance.phone = validated_data.get("phone", instance.phone)

        instance.save()
        return instance


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = (
            "name",
            "image",
            "slug",
            "description",
            "number_of_employees",
        )

    def get_image(self, profile):
        request = self.context.get("request")
        if profile.image:
            return request.build_absolute_uri(profile.image.url)
        return None


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)
    account_type = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "account_type", "password", "re_password")

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("re_password"):
            error = "passwords does'nt match"
            raise serializers.ValidationError({"password": error, "re_password": error})
        return attrs

    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password")
        user = User(username=username, email=email)
        ##checking for the account type
        print(validated_data)
        account_type: str = validated_data.get("account_type", User.Types.EMPLOYEE)
        if account_type.lower() == "company":
            user.type = User.Types.COMPANY
        else:
            user.type = User.Types.EMPLOYEE
        user.set_password(password)
        user.save()
        return user
