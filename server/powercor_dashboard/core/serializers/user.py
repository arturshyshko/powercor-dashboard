from rest_framework import serializers
from core.models.user import User


class ProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name')
