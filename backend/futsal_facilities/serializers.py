from rest_framework import serializers
from .models import FutsalFacility  # Replace with the actual name of your model

class FutsalFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FutsalFacility  # Replace with your model name
        fields = '__all__'  # You can specify specific fields if needed, e.g., ['name', 'location', 'is_available']
