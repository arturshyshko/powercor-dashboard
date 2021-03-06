from rest_framework import serializers
from dashboard.models.discipline import Discipline
from dashboard.serializers.approved_variation import ApprovedVariationInListSerializer

from drf_writable_nested import WritableNestedModelSerializer


class DisciplineSerializer(WritableNestedModelSerializer):
    approved_variations = ApprovedVariationInListSerializer(many=True)

    class Meta:
        model = Discipline
        fields = (
            'id',
            'name',
            'stage',
            'budget',
            'due_date',
            'resources',
            'status',
            'actual_cost',
            'approved_variations',
        )


class DisciplineInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ('id', 'due_date', 'stage')
