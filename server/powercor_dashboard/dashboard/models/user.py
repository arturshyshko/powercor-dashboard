from django.db import models

from django.contrib.auth.models import AbstractUser, BaseUserManager


class PowercorUser(AbstractUser):
	pass


class PowercorUserManager(BaseUserManager):
	"""
	Custom user manager for using email as username.
	"""
	def _create_user(self, email, password, *args, **kwargs):
		"""
		Create and save user with email
		"""
		pass
