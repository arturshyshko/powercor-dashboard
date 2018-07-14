from rest_framework import serializers
from dashboard.models.discipline import Discipline


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            'id',
            'name',
            'project',
            'stage',
            'budget',
            'due_date',
            'resources',
            'status',
            )


class DisciplineInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ('id', 'due_date', 'stage')
