# views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from .models import Review
from .serializers import ReviewSerializer
import logging

logger = logging.getLogger(__name__)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['destroy']:
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().get_permissions()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'error': 'You do not have permission to delete this review.'}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['GET'])
    def court_reviews(self, request):
        try:
            court_id = request.query_params.get('court_id')
            if court_id:
                reviews = Review.objects.filter(court_id=court_id)
                average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
                serializer = self.get_serializer(reviews, many=True)
                return Response({
                    'reviews': serializer.data,
                    'average_rating': average_rating,
                    'total_reviews': reviews.count()
                })
            return Response({'error': 'court_id is required'}, status=400)
        except Exception as e:
            logger.error(f"Error fetching court reviews: {e}")
            return Response({'error': 'Internal Server Error'}, status=500)