from datetime import date

from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from constance import config

from django.core.validators import MaxValueValidator, MinValueValidator

from .manager import Manager
from .client import Client
from .choices import BusinessImportanceChoice


class Project(models.Model):
    STATUS_CHOICES = (
        ('FS', 'Feasibility study'),
        ('PD', 'Preliminary design'),
        ('DD', 'Detailed design'),
        ('SS', 'Site support'),
        ('OH', 'On hold'),
        ('CA', 'Canceled'),
    )

    network = models.IntegerField(
        primary_key=True,
        validators=[MinValueValidator(1000000), MaxValueValidator(9999999)]
        )
    name = models.CharField(max_length=200)
    manager = models.ForeignKey(Manager, null=True, on_delete=models.SET_NULL)
    client = models.ForeignKey(Client, null=True, on_delete=models.SET_NULL)
    comment = models.TextField(blank=True, null=True)
    business_importance = models.ForeignKey(
        BusinessImportanceChoice,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
        )
    priority = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.network} {self.name}"


def calculate_field(field, column_weight):
    result = 0
    if field and field.weight:
        result += field.weight * column_weight

    return result


@receiver(pre_save, sender=Project)
def set_priority(sender, instance, *args, **kwargs):
    """
    Calculate project priority based on all it's fields and their weights
    """
    result = 0

    # adding weight of the project fields
    result += calculate_field(instance.business_importance, config.BUSINESS_IMPORTANCE_WEIGHT)
    result += calculate_field(instance.client, config.CLIENT_WEIGHT)

    # adding weight for fields of each projects disciplines
    if instance.disciplines.count() > 0:
        for discipline in instance.disciplines.all():
            disciplines_result = 0

            disciplines_result += calculate_field(discipline.stage, config.STAGING_WEIGHT)
            disciplines_result += calculate_field(discipline.resources, config.RESOURCING_WEIGHT)
            disciplines_result += calculate_field(discipline.status, config.STATUS_WEIGHT)

            # adding weight for due_date field
            if discipline.due_date:
                left_days = (date.today() - discipline.due_date).days
                if left_days < config.DATE_LOWER_EDGE:
                    disciplines_result += config.DUE_DATE_LOWER_POINTS

                elif left_days > config.DATE_UPPER_EDGE:
                    disciplines_result += config.DUE_DATE_UPPER_POINTS

                else:
                    disciplines_result += config.DUE_DATE_MIDDLE_POINTS

            # adding weight for budget field
            if discipline.budget:

                if discipline.budget < config.BUDGET_LOWER_EDGE:
                    disciplines_result += config.BUDGET_LOWER_POINTS

                elif discipline.budget > config.BUDGET_UPPER_EDGE:
                    disciplines_result += config.BUDGET_UPPER_POINTS

                else:
                    disciplines_result += config.BUDGET_MIDDLE_POINTS

        result += disciplines_result / instance.disciplines.count()

    instance.priority = result
