from django.db import models
from django.core.validators import MinValueValidator


class Client(models.Model):
    name = models.CharField(max_length=200, unique=True)
    weight = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name
