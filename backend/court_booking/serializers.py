from rest_framework import serializers
from .models import CourtBooking
from .models import Schedule

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class CourtBookingSerializer(serializers.ModelSerializer):
    futsal_name = serializers.SerializerMethodField()
    scheduled_time = serializers.SerializerMethodField()

    def get_futsal_name(self, obj):
        return obj.schedule.facility.name
    
    def get_scheduled_time(self, obj):
        start = obj.schedule.start_time.strftime("%H:%M")
        end = obj.schedule.end_time.strftime("%H:%M")
        return f"{start}-{end}"


    class Meta:
        model = CourtBooking
        fields = '__all__'