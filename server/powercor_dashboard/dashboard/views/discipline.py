from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view


from dashboard.models.discipline import Discipline
from dashboard.serializers.discipline import DisciplineSerializer


class DisciplineViewSet(viewsets.ModelViewSet):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer


@api_view(['GET'])
def discipline_names(request):
    queryset = Discipline.objects.all()
    return Response(set(list(map(lambda discipline: discipline.get_name_display(), queryset))))


