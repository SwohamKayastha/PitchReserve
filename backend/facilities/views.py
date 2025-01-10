from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import FutsalFacility
from .serializers import FutsalFacilitySerializer
from Owner.models import Owner
import logging

logger = logging.getLogger(__name__)

class FacilityListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Retrieve all facilities
        facilities = FutsalFacility.objects.all()
        serializer = FutsalFacilitySerializer(facilities, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Only authenticated owners can create a new facility
        if not request.user.is_authenticated or not hasattr(request.user, 'owner_profile'):
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        owner = request.user.owner_profile
        serializer = FutsalFacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=owner)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacilityDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, facility_id):
        try:
            return FutsalFacility.objects.get(pk=facility_id)
        except FutsalFacility.DoesNotExist:
            return None

    def get(self, request, facility_id):
        facility = self.get_object(facility_id)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FutsalFacilitySerializer(facility)
        return Response(serializer.data)

    def put(self, request, facility_id):
        facility = self.get_object(facility_id)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        # Only the owner of the facility can update it
        if not request.user.is_authenticated or facility.owner.user != request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = FutsalFacilitySerializer(facility, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, facility_id):
        facility = self.get_object(facility_id)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        # Only the owner of the facility can delete it
        if not request.user.is_authenticated or facility.owner.user != request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        facility.delete()
        return Response({'message': 'Facility deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import FutsalFacility
# from .serializers import FutsalFacilitySerializer

# # Function-Based View to handle GET (list) and POST (create)
# @api_view(['GET', 'POST'])
# def facility_list(request):
#     if request.method == 'GET':
#         # Retrieve all facilities
#         facilities = FutsalFacility.objects.all()
#         serializer = FutsalFacilitySerializer(facilities, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         # Create a new facility
#         serializer = FutsalFacilitySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # Function-Based View to handle GET (detail), PUT (update), and DELETE
# @api_view(['GET', 'PUT', 'DELETE'])
# def facility_detail(request, facility_id):
#     try:
#         # Get the specific facility
#         facility = FutsalFacility.objects.get(pk=facility_id)
#     except FutsalFacility.DoesNotExist:
#         return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         # Retrieve a specific facility's details
#         serializer = FutsalFacilitySerializer(facility)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         # Update a specific facility
#         serializer = FutsalFacilitySerializer(facility, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         # Delete a specific facility
#         facility.delete()
#         return Response({'message': 'Facility deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
