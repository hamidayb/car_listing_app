from email.policy import default
from hashlib import blake2b
from pyexpat import model
from statistics import mode
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.db import models
from django.utils import timezone

from rest_framework.authtoken.models import Token


class UserBaseManager(BaseUserManager):
    def create_user(self, email, name, gender, city, password=None):
        if not email:
            return ValueError('Email not provided')
        if not name:
            return ValueError('Name not provided')
        if not gender:
            return ValueError('Gender not provided')
        if not city:
            return ValueError('City not provided')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            gender=gender,
            city=city,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, gender, city, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            gender=gender,
            city=city,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    class GenderChoices(models.TextChoices):
        MALE = 'male', 'Male'
        FEMALE = 'female', 'Female'

    email = models.CharField(verbose_name='email', max_length=200, unique=True)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=6,
                              choices=GenderChoices.choices, default=GenderChoices.MALE)
    city = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(
        upload_to='../static/images/users', null=True, blank=True, default='avatar.png')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(default=timezone.now)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'gender', 'city']

    objects = UserBaseManager()

    def __str__(self) -> str:
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def save(self, *args, **kwargs):
        self.updated = timezone.now()
        super().save(*args, **kwargs)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
