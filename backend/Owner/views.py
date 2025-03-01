from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Owner
from .serializers import OwnerSerializer, UserSerializer
from django.conf import settings
from backend.settings import supabase
import requests
import mimetypes

# Register Owner
class OwnerRegisterView(APIView):
    permission_classes = [AllowAny]  # No authentication needed for registration

    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not all([first_name, last_name, username, password, email]):
            return Response({'error': 'All fields are required'}, status=400)

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User already exists'}, status=400)

        # Create the user
        user = User.objects.create_superuser(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create the owner profile
        Owner.objects.create(user=user)

        return Response({'message': 'Owner registered successfully'}, status=201)

# Login Owner
class OwnerLoginView(APIView):
    permission_classes = [AllowAny]  # Allow any to log in

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if username and password are provided
        if not username or not password:
            return Response({'error': 'Username and Password required'}, status=400)

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Invalid credentials'}, status=400)
        
        try:
            owner = Owner.objects.get(user=user)
        except Owner.DoesNotExist:
            return Response({'error': 'You are not authorized to access this page'}, status=403)


        # If authenticated, generate JWT token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'access_token': access_token,
            'username': user.username,
            'email': user.email
        }, status=200)

# Owner Form Submission
class OwnerFormView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can submit the form

    def post(self, request):
        phone_number = request.data.get('phone_number')
        field_name = request.data.get('field_name')
        number_of_venues = request.data.get('number_of_venues')
        location = request.data.get('location')
        additional_info = request.data.get('additional_info')
        image = request.FILES.get('image_url')

        # Fetch the owner profile
        owner = Owner.objects.get(user=request.user)

        # Upload image to Supabase storage using HTTP requests
        if image:
            file_name = f"owner_profile/{owner.user.username}_{image.name}"
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
                owner.image_url = image_url
            else:
                return Response({'error': f'Failed to upload image to Supabase: {response.text}'}, status=response.status_code)

        # Update the owner profile with the form data
        owner.phone_number = phone_number
        owner.field_name = field_name
        owner.number_of_venues = number_of_venues
        owner.location = location
        owner.additional_info = additional_info
        owner.save()

        return Response({'message': 'Owner profile updated successfully'}, status=200)

# Owner Profile View (Authenticated)
class OwnerProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated owners can access

    def get(self, request):
        # Ensure the logged-in user is the owner (check is_staff for owner)
        if not request.user.is_staff:
            raise PermissionDenied("You do not have permission to access this page.")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(request.user)
        access_token = str(refresh.access_token)

        try:
            # Fetch the owner details
            owner = Owner.objects.get(user=request.user)
        except Owner.DoesNotExist:
            return Response({'error': 'Owner profile does not exist'}, status=404)
        
        
        # Generate signed URL for the image
        if owner.image_url:
            bucket_name = "owner_profile"
            file_path = owner.image_url.split('/')[-1]  # Extract file path from URL
            signed_url_response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in=3600)  # URL expires in 1 hour
            signed_url = signed_url_response.get('signedURL')
        else:
            signed_url = None


        owner_serializer = OwnerSerializer(owner)
        owner_data = owner_serializer.data
        owner_data['image_url'] = signed_url

        # Return the access token and owner data
        return Response({
            "access_token": access_token,
            "owner": owner_data
        }, status=200)
    

class OwnerProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        owner = Owner.objects.get(user=request.user)
        data = request.data.copy()
        new_image = request.FILES.get('image_url')

        if new_image:
            file_name = f"owner_profile/{owner.user.username}_{new_image.name}"
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
            data['image_url'] = owner.image_url

        serializer = OwnerSerializer(owner, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)