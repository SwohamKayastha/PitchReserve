from django.urls import path
from .views import SchedulesListView, SchedulesDetailView

urlpatterns = [
    path('list/', SchedulesListView.as_view(), name='schedules_list'),  # List all schedules
    path('<int:schedule_id>/', SchedulesDetailView.as_view(), name='schedules_detail'),  # Retrieve, update, or delete a schedule by ID
]
