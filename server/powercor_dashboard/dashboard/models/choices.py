from django.db import models


class Choice(models.Model):
    choice = models.CharField(primary_key=True, max_length=200)

    class Meta:
        abstract = True


class BusinessImportanceChoice(Choice):
    pass


class ResourcesChoice(Choice):
    pass


class StageChoice(Choice):
    pass


class StatusChoice(Choice):
    pass
