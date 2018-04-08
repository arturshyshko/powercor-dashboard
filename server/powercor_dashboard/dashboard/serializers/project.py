from rest_framework import serializers
from dashboard.models.project import Project

from dashboard.serializers.discipline import DisciplineSerializer


class ProjectSerializer(serializers.ModelSerializer):
    disciplines = DisciplineSerializer(source='project', many=True)

    class Meta:
        model = Project
        fields = (
            'network',
            'name',
            'manager',
            'client',
            'comment',
            'disciplines',
            'business_importance',
            )
