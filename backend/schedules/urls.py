from django.urls import path
from .views import SchedulesListView, SchedulesDetailView, GenerateTimeSlotsView

urlpatterns = [
    path('list/', SchedulesListView.as_view(), name='schedules_list'),  # List all schedules
    path('<int:schedule_id>/', SchedulesDetailView.as_view(), name='schedules_detail'),  # Retrieve, update, or delete a schedule by ID
    path('generate-time-slots/<int:facility_id>/<str:date>/', GenerateTimeSlotsView.as_view(), name='generate_time_slots'),  # Generate time slots for a given date
]
