from django.db import models
from .project import Project
from .choices import *



class Discipline(models.Model):
    name = models.CharField(max_length=200)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    stage = models.ForeignKey(StageChoice,null=True, on_delete=models.SET_NULL)
    budget = models.DecimalField(max_digits=14, decimal_places=2)
    due_date = models.DateField()
    resources = models.ForeignKey(ResourcesChoice,null=True, on_delete=models.SET_NULL)
    status = models.ForeignKey(StatusChoice,null=True, on_delete=models.SET_NULL)

