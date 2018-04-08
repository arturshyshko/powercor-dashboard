from rest_framework import viewsets
from rest_framework.response import Response

from dashboard.models.project import Project
from dashboard.serializers.project import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
