from rest_framework import serializers
from dashboard.models.choices import *


class BusinessImportanceChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImportanceChoice
        fields = ('choice', 'weight',)


class ResourcesChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourcesChoice
        fields = ('choice', 'weight',)


class StageChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StageChoice
        fields = ('choice', 'weight',)


class StatusChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusChoice
        fields = ('choice', 'weight',)
