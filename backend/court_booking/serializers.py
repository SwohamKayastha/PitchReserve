from rest_framework import serializers
from .models import CourtBooking
from .models import Schedule

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class CourtBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourtBooking
        fields = '__all__'