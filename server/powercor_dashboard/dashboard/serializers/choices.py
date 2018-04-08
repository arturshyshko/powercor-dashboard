from rest_framework import serializers
from dashboard.models.choices import *


class BusinessImportanceChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImportanceChoice
        fields = ('choice',)


class ResourcesChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourcesChoice
        fields = ('choice',)


class StageChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StageChoice
        fields = ('choice',)


class StatusChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusChoice
        fields = ('choice',)
