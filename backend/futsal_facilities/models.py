from django.db import models
from Owner.models import Owner  # Import the Owner model

class FutsalFacility(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name="futsal_facilities")  # One-to-many relationship with Owner
    facility_id = models.AutoField(primary_key=True)  # Auto-increment ID
    name = models.CharField(max_length=255)          # Facility name
    location = models.CharField(max_length=255)      # Facility location
    coordinates = models.CharField(max_length=50)    # Coordinates as string
    number_of_pitches = models.IntegerField()        # Number of pitches
    pitch_dimensions = models.CharField(max_length=50)  # Pitch dimensions
    availability_start_time = models.TimeField()     # Start availability
    availability_end_time = models.TimeField()       # End availability
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)  # Price
    has_changing_room = models.BooleanField(default=False)  # Changing room availability
    parking_facilities = models.CharField(max_length=255, null=True, blank=True)  # Parking facilities
    water_availability = models.BooleanField(default=False)  # Water availability
    event_capacity = models.IntegerField()                  # Event capacity
    created_at = models.DateTimeField(auto_now_add=True)     # Timestamp

    def __str__(self):
        return self.name