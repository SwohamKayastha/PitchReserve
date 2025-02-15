from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import CourtBooking, Schedule
from .serializers import CourtBookingSerializer, ScheduleSerializer
from datetime import datetime

class CreateBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        schedule_id = request.data.get('schedule_id')
        schedule = get_object_or_404(Schedule, schedule_id=schedule_id)

        if schedule.is_booked:
            return Response({'error': 'This time slot is already booked'}, status=status.HTTP_400_BAD_REQUEST)

        booking = CourtBooking.objects.create(
            user=user,
            schedule=schedule,
            payment_status='pending'
        )
        schedule.is_booked = True
        schedule.save()

        serializer = CourtBookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        bookings = CourtBooking.objects.filter(user=user)
        serializer = CourtBookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, booking_id):
        user = request.user
        booking = get_object_or_404(CourtBooking, booking_id=booking_id, user=user)

        if booking.payment_status == 'completed':
            return Response({'error': 'Cannot cancel a completed booking'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the schedule to mark it as not booked
        schedule = booking.schedule
        schedule.is_booked = False
        schedule.save()

        # Delete the booking
        booking.delete()

        return Response({'success': 'Booking canceled successfully'}, status=status.HTTP_200_OK)

class CheckScheduleAvailabilityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, schedule_id=schedule_id)
        is_booked = schedule.is_booked
        return Response({'schedule_id': schedule_id, 'is_booked': is_booked}, status=status.HTTP_200_OK)
    

class ListSchedulesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class FacilityScheduleByDateView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, facility_id, date_str, *args, **kwargs):
        try:
            # Convert the date_str (expected format YYYY-MM-DD) into a date object.
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Filter schedules for the given facility and date.
        schedules = Schedule.objects.filter(facility_id=facility_id, date=date_obj)
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)