from rest_framework import serializers
from dashboard.models.choices import *


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('choice', 'weight',)


class BusinessImportanceChoiceSerializer(ChoiceSerializer):
    class Meta(ChoiceSerializer.Meta):
        model = BusinessImportanceChoice


class ResourcesChoiceSerializer(ChoiceSerializer):
    class Meta(ChoiceSerializer.Meta):
        model = ResourcesChoice


class StageChoiceSerializer(ChoiceSerializer):
    class Meta(ChoiceSerializer.Meta):
        model = StageChoice


class StatusChoiceSerializer(ChoiceSerializer):
    class Meta(ChoiceSerializer.Meta):
        model = StatusChoice
