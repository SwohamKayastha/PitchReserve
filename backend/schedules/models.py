from django.db import models
from facilities.models import FutsalFacility

class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)  # Auto-increment ID
    facility = models.ForeignKey(
        FutsalFacility, 
        on_delete=models.CASCADE, 
        related_name='schedules'
    )  # Foreign key to FutsalFacility
    date = models.DateField()                        # Date of the schedule
    start_time = models.TimeField()                  # Start time of the schedule
    end_time = models.TimeField()                    # End time of the schedule
    is_booked = models.BooleanField(default=False)   # Booking status

    def __str__(self):
        return f"Schedule for {self.facility.name} on {self.date}"