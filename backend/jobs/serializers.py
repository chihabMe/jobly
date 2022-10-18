from rest_framework import serializers

from .models import Job


class JobsListSerailizer(serializers.ModelSerializer):
    description = serializers.CharField(write_only=True)

    class Meta:
        model = Job
        fields = [
            "title", 'introduction', 'description', 'salary', 'positions',
            'slug'
        ]


class JobsDetailsSerailizer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = [
            "title", 'introduction', 'description', 'salary', 'positions',
            'slug'
        ]

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
