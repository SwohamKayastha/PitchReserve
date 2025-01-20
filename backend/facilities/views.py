from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import FutsalFacility, FacilityImage
from .serializers import FutsalFacilitySerializer, FacilityImageSerializer
from Owner.models import Owner
import logging
from django.conf import settings
from backend.settings import supabase
import requests
import mimetypes

logger = logging.getLogger(__name__)

class FacilityListView(APIView):
    permission_classes = [AllowAny]

    # def get(self, request):
    #     facilities = FutsalFacility.objects.all()
    #     serializer = FutsalFacilitySerializer(facilities, many=True)
    #     data = serializer.data

    #     for facility in data:
    #         if facility['image_url']:
    #             bucket_name = "field_image"
    #             file_path = facility['image_url'].split('/')[-1]  # Extract file path from URL
    #             signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
    #             signed_url = signed_url_response.get('signedURL')
    #             facility['image_url'] = signed_url

    #     return Response(data)

    def get(self, request, *args, **kwargs):
        facilities = FutsalFacility.objects.all()
        serializer = FutsalFacilitySerializer(facilities, many=True)
        data = serializer.data

        for facility in data:
            images = FacilityImage.objects.filter(facility_id=facility['id'])
            signed_urls = []
            for image in images:
                bucket_name = "field_image"
                file_path = image.image_url.split('/')[-1]  # Extract file path from URL
                signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
                signed_url = signed_url_response.get('signedURL')
                signed_urls.append(signed_url)
            facility['images'] = signed_urls

        return Response(data, status=status.HTTP_200_OK)



    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not hasattr(request.user, 'owner_profile'):
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        owner = request.user.owner_profile
        data = request.data.copy()  # Copy request data for manipulation

        print("Data: ", data)

        image_urls = []
        for key in request.FILES:
            image = request.FILES[key]
            field_name = data.get('name')
            file_name = f"field_image/{field_name}_{image.name}"
            url = f"{settings.SUPABASE_URL}/storage/v1/object/{file_name}"
            mime_type, _ = mimetypes.guess_type(image.name)
            headers = {
                "apikey": settings.SUPABASE_KEY,
                "Authorization": f"Bearer {settings.SUPABASE_KEY}",
                "Content-Type": mime_type or "application/octet-stream"
            }
            response = requests.post(url, headers=headers, data=image.read())
            if response.status_code == 200:
                image_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/{file_name}"
                image_urls.append(image_url)
                print(f"Image URL: {image_url}")  # Add logging to print the image URL
            else:
                return Response({'error': f'Failed to upload: {response.text}'}, status=response.status_code)

        serializer = FutsalFacilitySerializer(data=data)  # Use 'data' here

        if serializer.is_valid():
            facility = serializer.save(owner=owner)
            for image_url in image_urls:
                FacilityImage.objects.create(facility=facility, image_url=image_url)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)  # Add logging to print serializer errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # def post(self, request):
    #     # Only authenticated owners can create a new facility
    #     if not request.user.is_authenticated or not hasattr(request.user, 'owner_profile'):
    #         return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

    #     owner = request.user.owner_profile
    #     image = request.FILES.get('image_url')
    #     data = request.data.copy()  # Copy request data for manipulation

    #     print("Data: ", data)

    #     if image:
    #         field_name = data.get('name')
    #         file_name = f"field_image/{field_name}_{image.name}"
    #         url = f"{settings.SUPABASE_URL}/storage/v1/object/{file_name}"
    #         mime_type, _ = mimetypes.guess_type(image.name)
    #         headers = {
    #             "apikey": settings.SUPABASE_KEY,
    #             "Authorization": f"Bearer {settings.SUPABASE_KEY}",
    #             "Content-Type": mime_type or "application/octet-stream"
    #         }
    #         response = requests.post(url, headers=headers, data=image.read())
    #         if response.status_code == 200:
    #             image_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/{file_name}"
    #             data['image_url'] = image_url
    #             print(f"Image URL: {image_url}")  # Add logging to print the image URL
    #         else:
    #             return Response({'error': f'Failed to upload: {response.text}'}, status=response.status_code)

    #     serializer = FutsalFacilitySerializer(data=data)  # Use 'data' here

    #     # print(f"image_url {data['image_url']}")

    #     if serializer.is_valid():
    #         serializer.save(owner=owner)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FacilityDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, facility_id):
        try:
            return FutsalFacility.objects.get(pk=facility_id)
        except FutsalFacility.DoesNotExist:
            return None

    # def get(self, request, facility_id):
    #     facility = self.get_object(facility_id)
    #     if facility is None:
    #         return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

    #     if facility.image_url:
    #         bucket_name = "field_image"
    #         file_path = facility.image_url.split('/')[-1]  # Extract file path from URL
    #         signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
    #         signed_url = signed_url_response.get('signedURL')
    #     else:
    #         signed_url = None


    #     facility_serializer = FutsalFacilitySerializer(facility)
    #     facility_data = facility_serializer.data
    #     facility_data['image_url'] = signed_url

    #     return Response(facility_data)
    

    def get(self, request, facility_id):
        facility = self.get_object(facility_id)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        images = FacilityImage.objects.filter(facility_id=facility_id)
        signed_urls = []
        for image in images:
            bucket_name = "field_image"
            file_path = image.image_url.split('/')[-1]  # Extract file path from URL
            signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
            signed_url = signed_url_response.get('signedURL')
            signed_urls.append(signed_url)

        facility_serializer = FutsalFacilitySerializer(facility)
        facility_data = facility_serializer.data
        facility_data['images'] = signed_urls

        return Response(facility_data)


    def put(self, request, facility_id):
        facility = self.get_object(facility_id)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        # Only the owner of the facility can update it
        if not request.user.is_authenticated or facility.owner.user != request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)


        data = request.data.copy()
        new_image = request.FILES.get('image_url')
        if new_image:
            # Upload new image to Supabase
            field_name = data.get('name', facility.name or 'unnamed_field')
            file_name = f"field_image/{field_name}_{new_image.name}"
            url = f"{settings.SUPABASE_URL}/storage/v1/object/{file_name}"
            mime_type, _ = mimetypes.guess_type(new_image.name)
            headers = {
                "apikey": settings.SUPABASE_KEY,
                "Authorization": f"Bearer {settings.SUPABASE_KEY}",
                "Content-Type": mime_type or "application/octet-stream"
            }
            response = requests.post(url, headers=headers, data=new_image.read())
            if response.status_code == 200:
                data['image_url'] = f"{settings.SUPABASE_URL}/storage/v1/object/public/{file_name}"
            else:
                return Response({'error': f'Failed to upload: {response.text}'}, status=response.status_code)
        else:
            # Keep existing image URL
            data['image_url'] = facility.image_url

        serializer = FutsalFacilitySerializer(facility, data=data)
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


class OwnerFacilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, facility_id, owner):
        try:
            return FutsalFacility.objects.get(id=facility_id, owner=owner)
        except FutsalFacility.DoesNotExist:
            return None

    def get(self, request, facility_id=None):
        owner = request.user.owner_profile

        if facility_id:
            facility = self.get_object(facility_id, owner)
            if facility is None:
                return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

            images = FacilityImage.objects.filter(facility_id=facility_id)
            signed_urls = []
            for image in images:
                bucket_name = "field_image"
                file_path = image.image_url.split('/')[-1]  # Extract file path from URL
                signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
                signed_url = signed_url_response.get('signedURL')
                signed_urls.append(signed_url)

            facility_serializer = FutsalFacilitySerializer(facility)
            facility_data = facility_serializer.data
            facility_data['images'] = signed_urls

            return Response(facility_data)
        else:
            facilities = FutsalFacility.objects.filter(owner=owner)
            serializer = FutsalFacilitySerializer(facilities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, facility_id):
        owner = request.user.owner_profile
        facility = self.get_object(facility_id, owner)
        if facility is None:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = FutsalFacilitySerializer(facility, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
