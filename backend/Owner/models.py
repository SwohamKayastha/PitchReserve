from django.contrib.auth.models import User
from django.db import models

class Owner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="owner_profile")
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    field_name = models.CharField(max_length=255, blank=True, null=True)
    number_of_venues = models.IntegerField(default=0)
    location = models.CharField(max_length=255, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)
    image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.user.username