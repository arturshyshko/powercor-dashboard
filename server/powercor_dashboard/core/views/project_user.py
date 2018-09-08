from rest_framework import viewsets

from core.models.user import User
from core.serializers.project_user import ProjectUserSerializer


class ProjectUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProjectUserSerializer
