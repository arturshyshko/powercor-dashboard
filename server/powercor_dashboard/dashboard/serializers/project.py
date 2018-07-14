from rest_framework import serializers
from dashboard.models.project import Project
from dashboard.models.client import Client

from dashboard.serializers.discipline import DisciplineSerializer, DisciplineInListSerializer
from dashboard.serializers.manager import ManagerSerializer
from dashboard.serializers.client import ClientSerializer
from dashboard.serializers.choices import BusinessImportanceChoiceSerializer, ResourcesChoiceSerializer, \
    StageChoiceSerializer, StatusChoiceSerializer



class ProjectInListSerializer(serializers.ModelSerializer):
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

    def update(self, instance, validated_data):
        disciplines_data = validated_data.pop('disciplines', None)

        instance.name = validated_data.get('name', instance.name)
        instance.comment = validated_data.get('comment', instance.comment)

        client = validated_data.get('client')
        if client:
            instance.client = client

        manager = validated_data.get('manager')
        if manager:
            instance.manager = manager

        business_importance = validated_data.get('business_importance')
        if business_importance:
            instance.business_importance = business_importance

        if disciplines_data:
            print(disciplines_data)

        instance.save()

        return instance
