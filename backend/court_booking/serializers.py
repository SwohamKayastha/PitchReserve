# from rest_framework import serializers
# from .models import CourtBooking
# from .models import Schedule
# from .models import FutsalFacility

# class ScheduleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Schedule
#         fields = '__all__'

# class FutsalFacilitySerialzer(serializers.ModelSerializer):
#     class Meta:
#         model = FutsalFacility
#         fields = 'name'

# class CourtBookingSerializer(serializers.ModelSerializer):
#     futsal_name = serializers.SerializerMethodField()
#     scheduled_time = serializers.SerializerMethodField()
#     scheduled_date = serializers.SerializerMethodField()
#     facility_name = serializers.SerializerMethodField()

#     def get_futsal_name(self, obj):
#         return obj.schedule.facility.name
    
#     def get_scheduled_time(self, obj):
#         start = obj.schedule.start_time.strftime("%H:%M")
#         end = obj.schedule.end_time.strftime("%H:%M")
#         return f"{start}-{end}"
    
#     def get_scheduled_date(self, obj):
#         return obj.schedule.date.strftime("%Y-%m-%d")


#     class Meta:
#         model = CourtBooking
#         fields = '__all__'

from rest_framework import serializers
from .models import CourtBooking, Schedule, FutsalFacility

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class FutsalFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FutsalFacility
        fields = ['name']

class CourtBookingSerializer(serializers.ModelSerializer):
    futsal_name = serializers.SerializerMethodField()
    scheduled_time = serializers.SerializerMethodField()
    scheduled_date = serializers.SerializerMethodField()
    facility_name = serializers.SerializerMethodField()
    is_booked = serializers.SerializerMethodField()  # Add is_booked field

    def get_futsal_name(self, obj):
        return obj.schedule.facility.name
    
    def get_scheduled_time(self, obj):
        start = obj.schedule.start_time.strftime("%H:%M")
        end = obj.schedule.end_time.strftime("%H:%M")
        return f"{start}-{end}"
    
    def get_scheduled_date(self, obj):
        return obj.schedule.date.strftime("%Y-%m-%d")
    
    def get_facility_name(self, obj):
        return obj.schedule.facility.name  # Ensure this method is defined
    
    def get_is_booked(self, obj):
        return obj.schedule.is_booked  # Get is_booked from related Schedule model

    class Meta:
        model = CourtBooking
        fields = '__all__'