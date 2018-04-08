from django.db import models
from django.core.validators import MinValueValidator


class Choice(models.Model):
    choice = models.CharField(primary_key=True, max_length=200)
    weight = models.IntegerField(validators=[MinValueValidator(0)])

    class Meta:
        abstract = True
        unique_together = ('choice', 'weight',)

    def __str__(self):
        return self.choice


class BusinessImportanceChoice(Choice):
    pass


class ResourcesChoice(Choice):
    pass


class StageChoice(Choice):
    pass


class StatusChoice(Choice):
    pass
