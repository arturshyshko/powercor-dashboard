from rest_framework import viewsets
from rest_framework.response import Response

from .models.manager import Manager

from .serializers.manager import ManagerSerializer


class ManagerViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
