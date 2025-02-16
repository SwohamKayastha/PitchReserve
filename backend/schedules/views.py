from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Schedule, FutsalFacility
from .serializers import SchedulesSerializer

def generate_time_slots(start_time, end_time, interval_minutes):
    slots = []
    current = start_time
    while current + timedelta(minutes=interval_minutes) <= end_time:
        slot_end = current + timedelta(minutes=interval_minutes)
        slots.append(f"{current.strftime('%H:%M')} - {slot_end.strftime('%H:%M')}")
        current = slot_end
    return slots

class SchedulesListView(APIView):
    """
    Handles listing all schedules and creating a new schedule.
    """
    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = SchedulesSerializer(schedules, many=True)
        # Attach generated timeslots to each schedule
        data = serializer.data
        for index, schedule_data in enumerate(data):
            schedule_obj = schedules[index]
            start_time = schedule_obj.start_time
            end_time = schedule_obj.end_time
            interval = schedule_obj.interval
            timeslots = generate_time_slots(start_time, end_time, interval)
            schedule_data['timeslots'] = timeslots
        return Response(data, status=status.HTTP_200_OK)

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
            return Schedule.objects.get(id=schedule_id)
        except Schedule.DoesNotExist:
            return None

    def get(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if not schedule:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SchedulesSerializer(schedule)
        # Generate timeslots for this schedule
        timeslots = generate_time_slots(schedule.start_time, schedule.end_time, schedule.interval)
        data = serializer.data
        data['timeslots'] = timeslots
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if not schedule:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SchedulesSerializer(schedule, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, schedule_id):
        schedule = self.get_object(schedule_id)
        if not schedule:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GenerateTimeSlotsView(APIView):
    """
    Handles generating time slots for a specific facility on a specific date.
    """
    def post(self, request, facility_id, date):
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        
        facility = get_object_or_404(FutsalFacility, id=facility_id)
        # start_time = datetime.combine(date_obj, facility.availability_start_time)
        # end_time = datetime.combine(date_obj, facility.availability_end_time)
        # time_slots = []

        # while start_time < end_time:
        #     slot_end_time = start_time + timedelta(hours=1)
        #     if slot_end_time > end_time:
        #         break
        #     time_slot = Schedule(
        #         date=date_obj,
        #         start_time=start_time.time(),
        #         end_time=slot_end_time.time(),
        #         facility=facility
        #     )
        #     time_slot.save()
        #     time_slots.append(time_slot)
        #     start_time = slot_end_time

        # serializer = SchedulesSerializer(time_slots, many=True)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

        self.generate_weekly_slots(facility_id)
        return Response({"message": "Weekly slots generated"}, status=status.HTTP_201_CREATED)
            

    def generate_slots_for_date(self, facility, date_obj):
        time_slots = []
        start_time = datetime.combine(date_obj, facility.availability_start_time)
        end_time = datetime.combine(date_obj, facility.availability_end_time)

        while start_time < end_time:
            slot_end_time = start_time + timedelta(hours=1)
            if slot_end_time > end_time:
                break
            time_slot = Schedule.objects.create(
                date=date_obj,
                start_time=start_time.time(),
                end_time=slot_end_time.time(),
                facility=facility
            )
            time_slots.append(time_slot)
            start_time = slot_end_time
        
        return time_slots

    def generate_weekly_slots(self, facility_id):
        facility = get_object_or_404(FutsalFacility, id=facility_id)
        today = datetime.today().date()
        all_slots = []
        
        for i in range(7):
            date_obj = today + timedelta(days=i)
            slots = self.generate_slots_for_date(facility, date_obj)
            all_slots.extend(slots)
            
        return all_slots


    # def generate_weekly_slots(self, facility_id):
    #     facility = get_object_or_404(FutsalFacility, id=facility_id)
    #     today = datetime.today().date()
    #     for i in range(7):
    #         date_obj = today + timedelta(days=i)
    #         self.generate_slots_for_date(facility, date_obj)

    # def generate_slots_for_date(self, facility, date_obj):
    #     start_time = datetime.combine(date_obj, facility.availability_start_time)
    #     end_time = datetime.combine(date_obj, facility.availability_end_time)
    #     while start_time < end_time:
    #         slot_end_time = start_time + timedelta(hours=1)
    #         if slot_end_time > end_time:
    #             break
    #         Schedule.objects.create(
    #             date=date_obj,
    #             start_time=start_time.time(),
    #             end_time=slot_end_time.time(),
    #             facility=facility
    #         )
    #         start_time = slot_end_time


# class GenerateTimeSlotsView(APIView):
#     """
#     Handles generating time slots for a specific facility on a specific date.
#     """
#     def post(self, request, facility_id, date):
#         # Convert date string to datetime.date object
#         try:
#             date_obj = datetime.strptime(date, '%Y-%m-%d').date()
#         except ValueError:
#             return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         facility = get_object_or_404(FutsalFacility, id=facility_id)
#         start_time = datetime.combine(date_obj, facility.availability_start_time)
#         end_time = datetime.combine(date_obj, facility.availability_end_time)
#         time_slots = []

#         while start_time < end_time:
#             slot_end_time = start_time + timedelta(hours=1)
#             if slot_end_time > end_time:
#                 break
#             time_slot = Schedule(
#                 date=date_obj,
#                 start_time=start_time.time(),
#                 end_time=slot_end_time.time(),
#                 facility=facility
#             )
#             time_slot.save()
#             time_slots.append(time_slot)
#             start_time = slot_end_time

#         serializer = SchedulesSerializer(time_slots, many=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Schedule
# from .serializers import SchedulesSerializer
# from facilities.models import FutsalFacility
# from django.shortcuts import get_object_or_404
# from datetime import datetime, timedelta
# from rest_framework.response import Response


# class SchedulesListView(APIView):
#     """
#     Handles listing all schedules and creating a new schedule.
#     """
#     def get(self, request):
#         schedules = Schedule.objects.all()
#         serializer = SchedulesSerializer(schedules, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = SchedulesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SchedulesDetailView(APIView):
#     """
#     Handles retrieving, updating, and deleting a specific schedule.
#     """
#     def get_object(self, schedule_id):
#         try:
#             return Schedule.objects.get(schedule_id=schedule_id)
#         except Schedule.DoesNotExist:
#             return None

#     def get(self, request, schedule_id):
#         schedule = self.get_object(schedule_id)
#         if schedule is None:
#             return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = SchedulesSerializer(schedule)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def put(self, request, schedule_id):
#         schedule = self.get_object(schedule_id)
#         if schedule is None:
#             return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = SchedulesSerializer(schedule, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, schedule_id):
#         schedule = self.get_object(schedule_id)
#         if schedule is None:
#             return Response({'error': 'Schedule not found'}, status=status.HTTP_404_NOT_FOUND)
#         schedule.delete()
#         return Response({'message': 'Schedule deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



# class GenerateTimeSlotsView(APIView):
#     def post(self, request, facility_id, date):
#         # Convert date string to datetime.date object
#         try:
#             date_obj = datetime.strptime(date, '%Y-%m-%d').date()
#         except ValueError:
#             return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         facility = get_object_or_404(FutsalFacility, id=facility_id)
#         start_time = datetime.combine(date_obj, facility.availability_start_time)
#         end_time = datetime.combine(date_obj, facility.availability_end_time)
#         time_slots = []

#         while start_time < end_time:
#             slot_end_time = start_time + timedelta(hours=1)
#             if slot_end_time > end_time:
#                 break
#             time_slot = Schedule(
#                 date=date_obj,
#                 start_time=start_time.time(),
#                 end_time=slot_end_time.time(),
#                 facility=facility
#             )
#             time_slot.save()
#             time_slots.append(time_slot)
#             start_time = slot_end_time

#         serializer = SchedulesSerializer(time_slots, many=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)