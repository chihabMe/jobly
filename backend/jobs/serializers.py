from rest_framework import serializers
from django.utils.timesince import timesince

from .models import Job


class JobsListSerailizer(serializers.ModelSerializer):
    description = serializers.CharField(write_only=True)
    book_marked = serializers.SerializerMethodField()
    since = serializers.SerializerMethodField()
    company =serializers.CharField(source="company.name")
    location =serializers.CharField(source="location.name")

    class Meta:
        model = Job
        fields = [
            "title", 'introduction','company','location','since','book_marked','description', 'salary', 'positions',
            'slug'
        ]
    def get_company(self,job):
        return 
    def get_since(self,job):
        return timesince(job.created)
    def get_book_marked(self,job):
        request  = self.context.get("request")
        print(request.user.is_authenticated)
        if not  request.user.is_authenticated:
            return False
        profile = request.user.employee_profile
        return job in profile.book_marked_jobs.all()


class JobsDetailsSerailizer(serializers.ModelSerializer):
    book_marked = serializers.SerializerMethodField()
    since = serializers.SerializerMethodField()
    applied  = serializers.SerializerMethodField()
    company =serializers.CharField(source="company.name")
    location =serializers.CharField(source="location.name")

    class Meta:
        model = Job
        fields = [
            "title",'description','applied','book_marked','since','company','location' ,'introduction', 'description', 'salary', 'positions',
            'slug'
        ]
    def get_applied(self,job):
        request  = self.context.get("request")
        if not  request.user.is_authenticated:
            return False
        profile = request.user.employee_profile
        return job in profile.applied_jobs.all()

    def get_since(self,job):
        return timesince(job.created)
    def get_book_marked(self,job):
        request  = self.context.get("request")
        if not  request.user.is_authenticated:
            return False
        profile = request.user.employee_profile
        return job in profile.book_marked_jobs.all()

    def create(self, **validated_data):
        user = self.context.get("requset").user
        return Job(user=user, **validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.introduction = validated_data.get('introduction',
                                                   instance.introduction)
        instance.descrition = validated_data.get('description',
                                                 instance.description)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.positions = validated_data.get('positions',
                                                instance.positions)
        return instance
    
