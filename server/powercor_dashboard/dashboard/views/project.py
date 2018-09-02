from rest_framework import viewsets

from dashboard.models.project import Project
from dashboard.serializers.project import ProjectSerializer, ProjectInListSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.order_by('-priority')

    def get_serializer_class(self):
        # if self.action == 'list':
        #     return ProjectInListSerializer
        # else:
        #     return ProjectSerializer
        return ProjectSerializer
