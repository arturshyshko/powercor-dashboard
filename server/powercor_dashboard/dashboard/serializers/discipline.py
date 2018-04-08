from rest_framework import serializers
from dashboard.models.discipline import Discipline


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            'name',
            'project',
            'stage',
            'budget',
            'due_date',
            'resources',
            'status',
            )
