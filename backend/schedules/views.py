from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import SchedulesSerializer


class SchedulesListView(APIView):
    """
    Handles listing all schedules and creating a new schedule.
    """
    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = SchedulesSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SchedulesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SchedulesDetailView(APIView):
    """
    Handles retrieving, updating, and deleting a specific schedule.
    """
    def get_object(self, schedule_id):
        try:
            return Schedule.objects.get(schedule_id=schedule_id)
        except Schedule.DoesNotExist:
            return None

    def get(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if schedule is None:
            return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SchedulesSerializer(schedule)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if schedule is None:
            return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SchedulesSerializer(schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if schedule is None:
            return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
        schedule.delete()
        return Response({'message': 'Schedule deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
