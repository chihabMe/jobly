from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.
class CustomManager(BaseUserManager):
    def create_user(self,email,username,password,*args,**kwargs):
        if not username:
            raise ValueError("the username is required")
        if not email:
            raise ValueError("  the email is required")
        if not password:
            raise ValueError("the password is required")
        user =   CustomUser(username=username,email=email,*args,**kwargs)
        user.set_password(password)
        return user.save()
    def create_superuser(self,email,username,password,*args,**kwargs):
        kwargs.setdefault("is_staff",True)
        kwargs.setdefault("is_superuser",True)
        kwargs.setdefault("is_active",True)

        if kwargs.get("is_staff")!=True:
            raise ValueError("the superuser have to be a staff")
        if kwargs.get("is_superuser")!=True:
            raise ValueError("the superuser have to be a superuser")
        if kwargs.get("is_active")!=True:
            raise ValueError("the superuser have to be an  active account")
        return self.create_user(email,username,password,*args,**kwargs)


class CustomUser(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(null=False,blank=False,unique=True)
    username = models.CharField(max_length=140,null=False,blank=False,unique=True)
    is_active  = models.BooleanField(default=False)
    is_superuser  = models.BooleanField(default=False)
    is_staff  = models.BooleanField(default=False)

    objects = CustomManager()
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ["username"]

