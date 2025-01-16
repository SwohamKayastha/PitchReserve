from rest_framework import serializers
from .models import FutsalFacility, FacilityImage

class FacilityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacilityImage
        fields = ['image_url']

class FutsalFacilitySerializer(serializers.ModelSerializer):
    images = FacilityImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = FutsalFacility
        fields = [
            'id', 'owner', 'name', 'location', 'coordinates', 'number_of_pitches', 
            'pitch_dimensions', 'availability_start_time', 'availability_end_time', 
            'price_per_hour', 'has_changing_room', 'parking_facilities', 
            'water_availability', 'event_capacity', 'created_at', 'lights', 
            'cafeteria', 'equipment', 'images'
        ]
        read_only_fields = ['owner', 'created_at']