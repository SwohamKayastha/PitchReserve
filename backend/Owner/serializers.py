from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Owner

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class OwnerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Owner
        fields = ['user', 'phone_number', 'field_name', 'number_of_venues', 'location', 'additional_info', 'image_url']