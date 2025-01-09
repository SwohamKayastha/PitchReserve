from django.urls import path
from . import views

urlpatterns = [
    path('', views.facility_list, name='facility_list'),  # List and create facilities
    path('<int:facility_id>/', views.facility_detail, name='facility_detail'),  # Retrieve, update, or delete a facility
]
