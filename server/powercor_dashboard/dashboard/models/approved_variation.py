from django.db import models

from dashboard.models import Discipline


class ApprovedVariation(models.Model):
    comment = models.TextField(blank=True, null=True)
    actual_cost = models.DecimalField(max_digits=14, decimal_places=2, blank=True, null=True)
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='approved_variations')

    def __str__(self):
        return f'{self.discipline} - {self.id} - {self.actual_cost}'
