from django.db import models
from django.contrib.auth.models import User
from schedules.models import Schedule

class FutsalFacility(models.Model):
    name = models.CharField(max_length=255)
    # Add other fields as necessary

    def __str__(self):
        return self.name

class CourtBooking(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    booking_id = models.AutoField(primary_key=True)  # Auto-increment ID
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='bookings'
    )  # Foreign key to User
    schedule = models.ForeignKey(
        Schedule, 
        on_delete=models.CASCADE, 
        related_name='schedules'
    )  # Foreign key to Schedule
    booking_date = models.DateTimeField(auto_now_add=True)  # Timestamp of booking
    payment_status = models.CharField(
        max_length=50, 
        choices=PAYMENT_STATUS_CHOICES, 
        default='pending'
    )  # Payment status
    transaction_id = models.CharField(max_length=100, blank=True, null=True)


    def __str__(self):
        return f"Booking by {self.user.username} for {self.schedule.facility.name} on {self.schedule.date} from {self.schedule.start_time} to {self.schedule.end_time}"