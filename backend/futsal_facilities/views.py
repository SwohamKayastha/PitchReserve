from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import FutsalFacility
from .serializers import FutsalFacilitySerializer

# Function-Based View to handle GET (list) and POST (create)
@api_view(['GET', 'POST'])
def facility_list(request):
    if request.method == 'GET':
        # Retrieve all facilities
        facilities = FutsalFacility.objects.all()
        serializer = FutsalFacilitySerializer(facilities, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new facility
        serializer = FutsalFacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Function-Based View to handle GET (detail), PUT (update), and DELETE
@api_view(['GET', 'PUT', 'DELETE'])
def facility_detail(request, facility_id):
    try:
        # Get the specific facility
        facility = FutsalFacility.objects.get(pk=facility_id)
    except FutsalFacility.DoesNotExist:
        return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve a specific facility's details
        serializer = FutsalFacilitySerializer(facility)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Update a specific facility
        serializer = FutsalFacilitySerializer(facility, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete a specific facility
        facility.delete()
        return Response({'message': 'Facility deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
