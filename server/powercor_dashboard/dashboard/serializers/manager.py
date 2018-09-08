from rest_framework import serializers
from server.powercor_dashboard.core.models.user import User


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name')
