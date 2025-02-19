from django.urls import path
from .views import InitiatePaymentView, PaymentSuccessView, PaymentFailedView

urlpatterns = [
    path('initiate/<int:booking_id>/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('success/', PaymentSuccessView.as_view(), name='payment-success'),
    path('failed/', PaymentFailedView.as_view(), name='payment-failed'),
]