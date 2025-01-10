from rest_framework import serializers
from .models import FutsalFacility

class FutsalFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FutsalFacility
        fields = '__all__'
        read_only_fields = ['owner']