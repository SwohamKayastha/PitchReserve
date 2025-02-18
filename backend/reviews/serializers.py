# serializers.py
from rest_framework import serializers
from .models import Review, FutsalFacility  # Ensure Court model is imported

class ReviewSerializer(serializers.ModelSerializer):
    court = serializers.IntegerField(write_only=True)  # Add court as a write-only field
    user_name = serializers.CharField(source='user.username', read_only=True)  # Add user_name field
    user_id = serializers.IntegerField(source='user.id', read_only=True)  # Add user_id field

    class Meta:
        model = Review
        fields = ['id', 'court', 'comment', 'rating', 'created_at', 'user_name', 'user_id']  # Include user_name and user_id in fields
        read_only_fields = ['created_at', 'user_name', 'user_id']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value

    def create(self, validated_data):
        court_id = validated_data.pop('court')
        court = FutsalFacility.objects.get(id=court_id)  # Ensure court is fetched correctly
        review = Review.objects.create(court=court, **validated_data)
        return review