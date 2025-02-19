from django.db import models
from Owner.models import Owner

class FutsalFacility(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name="facilities")
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    coordinates = models.CharField(max_length=100, blank=True, null=True)
    number_of_pitches = models.IntegerField()
    pitch_dimensions = models.CharField(max_length=100, blank=True, null=True)
    availability_start_time = models.TimeField()
    availability_end_time = models.TimeField()
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    has_changing_room = models.BooleanField(default=False)
    parking_facilities = models.BooleanField(default=False)
    water_availability = models.BooleanField(default=False)
    event_capacity = models.IntegerField(blank=True ,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    lights = models.BooleanField(default=False)
    cafeteria = models.BooleanField(default=False)
    equipment = models.BooleanField(default=False)
    # image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.location}"
    

class FacilityImage(models.Model):
    facility = models.ForeignKey(FutsalFacility, on_delete=models.CASCADE, related_name="images")
    image_url = models.URLField(max_length=200, blank=True, null=True)