from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver

PERMISSIONS = [
    'add_project',
    'change_project',
    'delete_project',
]


class PowercorUserManager(BaseUserManager):
    """
    Custom user manager for using email as username.
    """
    def _create_user(self, email, password, **kwargs):
        """
        Creates and saves a User with email and password
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **kwargs):
        return self._create_user(email, password, **kwargs)

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


@receiver(post_save, sender=User)
def user_post_save(sender, instance, **kwargs):
    if not instance.is_superuser:
        instance.is_staff = True
        for permission in PERMISSIONS:
            instance.user_permissions.add(Permission.objects.get(codename=permission))

        post_save.disconnect(user_post_save, sender=sender)
        instance.save()
        post_save.connect(user_post_save, sender=sender)
