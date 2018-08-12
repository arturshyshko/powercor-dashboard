from django.db import models
from django.conf import settings

from django.utils.translation import ugettext_lazy as _

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


class PowercorUser(AbstractUser):
	username = None
	email = models.EmailField(verbose_name='email address', unique=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	objects = PowercorUserManager()

	def __str__(self):
		return self.email

	settings.AUTH_USER_MODEL = 'dashboard.PowercorUser'
