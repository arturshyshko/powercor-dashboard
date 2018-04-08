from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from .manager import Manager
from .client import Client
from .choices import BusinessImportanceChoice


class Project(models.Model):
    network = models.IntegerField(
        primary_key=True,
        validators=[MinValueValidator(1000000), MaxValueValidator(9999999)]
        )
    name = models.CharField(max_length=200)
    manager = models.ForeignKey(Manager, null=True, on_delete=models.SET_NULL)
    client = models.ForeignKey(Client, null=True, on_delete=models.SET_NULL)
    comment = models.TextField()
    business_importance = models.ForeignKey(BusinessImportanceChoice, null=True, on_delete=models.SET_NULL)
