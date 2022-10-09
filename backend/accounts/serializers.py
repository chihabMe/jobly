from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("username","email","password","re_password")
    
    def validate(self, attrs):
        if(attrs.get("password")!=attrs.get("re_password")):
            error = "passwords does'nt match"
            raise serializers.ValidationError({"password":error,"re_password":error})
        return attrs
        
    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password")
        user = User(username=username,email=email)
        user.set_password(password)
        user.save()
        return user
    