from core.serializers.user import ProjectUserSerializer
from dashboard.models.project import Project

from dashboard.serializers.discipline import DisciplineSerializer, DisciplineInListSerializer
from drf_writable_nested import WritableNestedModelSerializer


class ProjectInListSerializer(WritableNestedModelSerializer):
    disciplines = DisciplineInListSerializer(many=True)
    manager = ProjectUserSerializer()

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
            'status',
        )
        read_only_fields = ('priority',)


class ProjectSerializer(ProjectInListSerializer):
    disciplines = DisciplineSerializer(many=True, partial=True)
    manager = ProjectUserSerializer()

    class Meta(ProjectInListSerializer.Meta):
        pass
