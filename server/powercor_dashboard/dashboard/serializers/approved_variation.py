from rest_framework import serializers

from dashboard.models.approved_variation import ApprovedVariation


class ApprovedVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovedVariation
        fields = (
            'id',
            'discipline',
            'actual_cost',
            'comment',
        )


class ApprovedVariationInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovedVariation
        fields = ('id', 'actual_cost', 'comment', )
