from rest_framework import serializers
from dashboard.models.manager import Manager


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('id', 'name')
