from django.urls import path
from .views import CreateBookingView, UserBookingsView, CancelBookingView, CheckScheduleAvailabilityView, ListSchedulesView

urlpatterns = [
    path('create/', CreateBookingView.as_view(), name='create-booking'),
    path('user-bookings/', UserBookingsView.as_view(), name='user-bookings'),
    path('cancel/<int:booking_id>/', CancelBookingView.as_view(), name='cancel-booking'),
    path('check-schedule/<int:schedule_id>/', CheckScheduleAvailabilityView.as_view(), name='check-schedule-availability'),
    path('schedules/', ListSchedulesView.as_view(), name='list-schedules'),
]