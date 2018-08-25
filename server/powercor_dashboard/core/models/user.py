from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class PowercorUserManager(BaseUserManager):
    """
    Custom user manager for using email as username.
    """
    def _create_user(self, email, password, *args, **kwargs):
        """
        Create and save user with email
        """
        if not email:
            raise ValueError('The Email must be set.')
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, *args, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if kwargs.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **kwargs)


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='email address', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = PowercorUserManager()

    def __str__(self):
        return self.email
