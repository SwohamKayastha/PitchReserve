from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('court_reviews/', ReviewViewSet.as_view({'get': 'court_reviews'}), name='court-reviews'),
]