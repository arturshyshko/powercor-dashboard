from rest_framework import viewsets

from dashboard.models.manager import Manager
from dashboard.serializers.manager import ManagerSerializer


class ManagerViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
