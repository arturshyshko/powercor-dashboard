from django.db import models
from .project import Project
from .choices import *


class Discipline(models.Model):
    NAME_CHOICES = (
        ('PD', 'Primary Design'),
        ('CD', 'Civil Design'),
        ('SD', 'Secondary Design'),
        ('OD', 'Overhead Design'),
        ('UD', 'Underground Design'),
    )

    name = models.CharField(max_length=200, choices=NAME_CHOICES)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='disciplines')
    stage = models.ForeignKey(StageChoice, null=True, blank=True, on_delete=models.SET_NULL)
    budget = models.DecimalField(max_digits=14, decimal_places=2, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    resources = models.ForeignKey(ResourcesChoice, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.ForeignKey(StatusChoice, null=True, blank=True, on_delete=models.SET_NULL)
    actual_cost = models.DecimalField(max_digits=14, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together=('name', 'project',)

    def __str__(self):
        return f"{self.project.name}, {self.name}"
