from rest_framework import serializers
from dashboard.models.project import Project
from dashboard.models.discipline import Discipline
from dashboard.models.client import Client

from dashboard.serializers.discipline import DisciplineSerializer, DisciplineInListSerializer
from dashboard.serializers.manager import ManagerSerializer
from dashboard.serializers.client import ClientSerializer
from dashboard.serializers.choices import BusinessImportanceChoiceSerializer, ResourcesChoiceSerializer, \
    StageChoiceSerializer, StatusChoiceSerializer
from drf_writable_nested import WritableNestedModelSerializer



class ProjectInListSerializer(WritableNestedModelSerializer):
    disciplines = DisciplineInListSerializer(many=True)

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
            'priority',
        )
        read_only_fields = ('priority',)


class ProjectSerializer(ProjectInListSerializer):
    disciplines = DisciplineSerializer(many=True, partial=True)

    class Meta(ProjectInListSerializer.Meta):
        pass
