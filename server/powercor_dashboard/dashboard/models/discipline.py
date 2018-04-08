from django.db import models
from .project import Project


class Discipline(models.Model):
    name = models.CharField(max_length=200)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    stage = models.CharField(max_length=200)
    budget = models.DecimalField(max_digits=14, decimal_places=2)
    due_date = models.DateField()
    resources = models.CharField(max_length=200)
    status = models.CharField(max_length=200)

