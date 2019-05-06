from rest_framework import viewsets

from dashboard.models.project import Project
from dashboard.serializers.project import ProjectSerializer, ProjectInListSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.order_by('-priority')
    serializer_class = ProjectSerializer
