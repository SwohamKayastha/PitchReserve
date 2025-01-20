from django.urls import path
from .views import FacilityListView, FacilityDetailView, OwnerFacilityView

urlpatterns = [
    path('list/', FacilityListView.as_view(), name='facility_list'),
    path('facilities/<int:facility_id>/', FacilityDetailView.as_view(), name='facility_detail'),
      path('owner/facilities/', OwnerFacilityView.as_view(), name='owner-facility-list'),
    path('owner/facilities/<int:facility_id>/', OwnerFacilityView.as_view(), name='owner-facility-detail'),
]