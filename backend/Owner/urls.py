from django.urls import path
from .views import OwnerRegisterView, OwnerLoginView, OwnerFormView, OwnerProfileView

urlpatterns = [
    path('register/', OwnerRegisterView.as_view(), name='owner-register'),
    path('login/', OwnerLoginView.as_view(), name='owner-login'),
    path('form/', OwnerFormView.as_view(), name='owner-form'),
    path('profile/', OwnerProfileView.as_view(), name='owner-profile'),
]