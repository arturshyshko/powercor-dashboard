from rest_framework import viewsets

from server.powercor_dashboard.core.models.user import User
from dashboard.serializers.manager import ManagerSerializer


class ManagerViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ManagerSerializer
