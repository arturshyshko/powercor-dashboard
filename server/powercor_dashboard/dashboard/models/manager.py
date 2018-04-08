from django.db import models


class Manager(models.Model):
    name = models.CharField(max_length=400, unique=True)

    def __str__(self):
        return self.name