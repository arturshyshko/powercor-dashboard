from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


from dashboard.models.discipline import Discipline
from dashboard.serializers.discipline import DisciplineSerializer


class DisciplineViewSet(viewsets.ModelViewSet):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer

    @action(methods=['GET'], detail=False, url_path='names')
    def discipline_names(self, request):
        """
        Get all possible names for disciplines and pass it to client
        """
        return Response(Discipline.NAME_CHOICES)
