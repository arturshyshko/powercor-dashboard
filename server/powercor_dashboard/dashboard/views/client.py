from rest_framework import viewsets
from rest_framework.response import Response

from dashboard.models.client import Client
from dashboard.serializers.client import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
