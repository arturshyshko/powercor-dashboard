from rest_framework import viewsets

from dashboard.models.approved_variation import ApprovedVariation
from dashboard.serializers.approved_variation import ApprovedVariationSerializer


class ApprovedVariationViewSet(viewsets.ModelViewSet):
    queryset = ApprovedVariation.objects.all()
    serializer_class = ApprovedVariationSerializer
