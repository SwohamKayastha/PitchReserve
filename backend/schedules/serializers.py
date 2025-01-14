from rest_framework import serializers
from .models import Schedule

class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'  # Include all fields, or you can explicitly list them
