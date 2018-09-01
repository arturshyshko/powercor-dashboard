from rest_framework import viewsets

from dashboard.serializers.choices import *


class BusinessImportanceChoiceViewSet(viewsets.ModelViewSet):
    queryset = BusinessImportanceChoice.objects.all()
    serializer_class = BusinessImportanceChoiceSerializer


class ResourcesChoiceViewSet(viewsets.ModelViewSet):
    queryset = ResourcesChoice.objects.all()
    serializer_class = ResourcesChoiceSerializer


class StageChoiceViewSet(viewsets.ModelViewSet):
    queryset = StageChoice.objects.all()
    serializer_class = StageChoiceSerializer


class StatusChoiceViewSet(viewsets.ModelViewSet):
    queryset = StatusChoice.objects.all()
    serializer_class = StatusChoiceSerializer
