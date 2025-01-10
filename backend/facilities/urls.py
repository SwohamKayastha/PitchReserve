from django.urls import path
from .views import FacilityListView, FacilityDetailView

urlpatterns = [
    path('list/', FacilityListView.as_view(), name='facility_list'),
    path('facilities/<int:facility_id>/', FacilityDetailView.as_view(), name='facility_detail'),
]