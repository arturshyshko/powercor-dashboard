from rest_framework import viewsets
from rest_framework.response import Response

from dashboard.models.discipline import Discipline
from dashboard.serializers.discipline import DisciplineSerializer


class DisciplineViewSet(viewsets.ModelViewSet):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer
