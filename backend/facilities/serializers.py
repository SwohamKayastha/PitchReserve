from rest_framework import serializers
from .models import FutsalFacility, FacilityImage
from Owner.models import Owner

class FacilityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacilityImage
        fields = ['image_url']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        # List the owner fields you wish to expose (e.g., name, phone, email, etc.)
        fields = ['id', 'phone_number']  # adjust fields as needed


class FutsalFacilitySerializer(serializers.ModelSerializer):
    images = FacilityImageSerializer(many=True, read_only=True)
    owner = OwnerSerializer(read_only=True)
    
    class Meta:
        model = FutsalFacility
        # fields = [
        #     'id', 'owner', 'name', 'location', 'coordinates', 'number_of_pitches', 
        #     'pitch_dimensions', 'availability_start_time', 'availability_end_time', 
        #     'price_per_hour', 'has_changing_room', 'parking_facilities', 
        #     'water_availability', 'event_capacity', 'created_at', 'lights', 
        #     'cafeteria', 'equipment', 'images'
        # ]
        fields= '__all__'
        read_only_fields = ['owner', 'created_at']