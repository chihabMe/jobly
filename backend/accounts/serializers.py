from django.contrib.auth import get_user_model
from locations.models import Location
from pkg_resources import require
from rest_framework import serializers

from .models import CompanyProfile, EmployeeProfile
from .validators import validate_file_extension

User = get_user_model()


class EmployeeProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    cv = serializers.FileField(required=False, validators=[validate_file_extension])
    name = serializers.CharField(required=False)
    email = serializers.CharField(source="user.email", read_only=True, required=False)
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

    def validate_location(self, attrs):
        try:
            location = self.__get_location_by_name(attrs)
            return location
        except:
            raise serializers.ValidationError("Invalid location")

    def update(self, instance: EmployeeProfile, validated_data):
        instance.cv = validated_data.get("cv", instance.cv)
        instance.name = validated_data.get("name", instance.name)
        instance.image = validated_data.get("image", instance.image)
        instance.phone = validated_data.get("phone", instance.phone)
        lc = validated_data.get("location")
        if lc is not None:
            instance.location = lc.get("name")
        instance.save()
        return instance

    def __get_location_by_name(self, name: str) -> Location:
        lc = Location.objects.get(name__icontains=name)
        return lc


class CompanyProfileSerializer(serializers.ModelSerializer):
    # image = serializers.ImageField(required=False)
    # cover = serializers.ImageField(required=False)
    image = serializers.SerializerMethodField()
    cover = serializers.SerializerMethodField()
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
    owner = serializers.SerializerMethodField()
    type = serializers.CharField(source="user.type", read_only=True)

    class Meta:
        model = CompanyProfile
        fields = (
            "name",
            "image",
            "cover",
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
            "owner",
            "location",
            "created",
        )

    def get_image(self, profile: CompanyProfile):
        if profile.image:
            return profile.image.url
        return ""

    def get_cover(self, profile: CompanyProfile):
        if profile.cover:
            return profile.cover.url
        return ""

    def get_owner(self, profile):
        user = self.context["request"].user
        return (
            user.is_authenticated
            and user.type == user.Types.COMPANY
            and user.company_profile == profile
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
        instance.cover = validated_data.get("cover", instance.cover)
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
        user.is_active = True
        ##checking for the account type
        account_type: str = validated_data.get("account_type", User.Types.EMPLOYEE)
        if account_type.lower() == "company":
            user.type = User.Types.COMPANY
        else:
            user.type = User.Types.EMPLOYEE
        user.set_password(password)
        user.save()
        return user
