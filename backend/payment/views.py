from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse
from django.conf import settings
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
# Remove IsAuthenticated if tokens are not automatically sent on redirect
#from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from court_booking.models import CourtBooking
import requests
import hmac, base64, hashlib
import time, json

class InitiatePaymentView(APIView):
    # If you use token-based auth causing issues on browser redirect,
    # you may remove or comment out the authentication.
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    def post(self, request, booking_id):
        return self.handle_payment(request, booking_id)

    def get(self, request, booking_id):
        return self.handle_payment(request, booking_id)

    def handle_payment(self, request, booking_id):
        booking = get_object_or_404(CourtBooking, booking_id=booking_id)
        # amount = booking.schedule.facility.price_per_hour
        # transaction_id = booking.booking_id
        raw_amount = booking.schedule.facility.price_per_hour
        amount = "{:.0f}".format(float(raw_amount))
        transaction_uuid = f"{booking.booking_id}-{int(time.time())}"
        product_code = str(settings.ESEWA_MERCHANT_ID)
        # Log for debugging purposes
        print("Amount:", amount, "Transaction:", transaction_uuid, "Product_code:", product_code)

        secret = '8gBm/:&EnhH.1/q'

        # hmac_sha256 = hmac.new(secret, message, hashlib.sha256)
        # digest = hmac_sha256.digest()
        # signature = base64.b64encode(digest).decode('utf-8') 

        # Set the eSewa endpoint URL.
        esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        # esewa_url = "https://epay.esewa.com.np/api/epay/main/v2/form"
        
        # Build the POST parameters based on eSewa's integration documentation.
        # Adjust these parameters as needed.
        params = {
            "amount": amount,
            "tax_amount": 0,
            "total_amount": amount,  # adjust if you calculate tax differently
            "transaction_uuid": transaction_uuid,
            "product_code": product_code,
            "product_service_charge": 0,
            "product_delivery_charge": 0,
            "success_url": request.build_absolute_uri(reverse('payment-success')),
            # "success_url": "https://developer.esewa.com.np/success",
            # "failure_url": request.build_absolute_uri(reverse('payment-failure')),
            "failure_url": 'https://developer.esewa.com.np/failure',
            "signed_field_names": "total_amount,transaction_uuid,product_code",
        }

        # Create signature message by concatenating total_amount, transaction_uuid, and product_code.
        # message = f"{params['total_amount']}{params['transaction_uuid']}{params['product_code']}"
        # print("Signature Message:", message)

        # Option 2: Use a comma-separated key=value string (uncomment to try)
        message = f"total_amount={params['total_amount']},transaction_uuid={params['transaction_uuid']},product_code={params['product_code']}"
        print("Signature Message (comma-separated):", message)

        print(request.build_absolute_uri(reverse('payment-success')))

        # Generate HMAC-SHA256 digest and encode it in base64.
        signature = base64.b64encode(
            hmac.new(secret.encode('utf-8'),
                     message.encode('utf-8'),
                     hashlib.sha256).digest()
        ).decode('utf-8')

        params['signature'] = signature

        print(signature)

        # Build auto-submitting form with hidden inputs.
        form_inputs = ""
        for key, value in params.items():
            form_inputs += f'<input type="hidden" name="{key}" value="{value}" />\n'
        
        html = f"""
        <html>
          <head>
            <title>Redirecting to eSewa...</title>
          </head>
          <body onload="document.forms['esewaForm'].submit();">
            <form name="esewaForm" method="POST" action="{esewa_url}">
              {form_inputs}
              <noscript>
                <input type="submit" value="Click here if you are not redirected automatically" />
              </noscript>
            </form>
            <p>Please wait while we redirect you to the eSewa payment page...</p>
          </body>
        </html>
        """
        return HttpResponse(html)


        # # Redirect the user to eSewa's payment form.
        # esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        # payload = {
        #     'amt': amount,
        #     'txAmt': 0,
        #     'psc': 0,
        #     'pdc': 0,
        #     'tAmt': amount,
        #     'pid': transaction_id,
        #     'scd': settings.ESEWA_MERCHANT_ID,
        #     'su': request.build_absolute_uri(reverse('payment-success')),
        #     'fu': request.build_absolute_uri(reverse('payment-failed')),
        # }

        # query_string = "&".join(["{}={}".format(k, v) for k, v in payload.items()])
        # final_url = esewa_url + '?' + query_string
        # return redirect(final_url)


# class PaymentSuccessView(APIView):
#     permission_classes = [AllowAny]
#     def get(self, request):
#         pid = request.GET.get('oid')
#         transaction_uuid = request.GET.get('transaction_uuid')
#         amount = request.GET.get('total_amount')
        
#         # Use eSewa's status check API
#         verify_url = "https://rc.esewa.com.np/api/epay/transaction/status/"
#         params = {
#             'product_code': settings.ESEWA_MERCHANT_ID,
#             'transaction_uuid': transaction_uuid,
#             'total_amount': amount
#         }
        
#         response = requests.get(verify_url, params=params)
#         print("eSewa Status Response:", response.text)
        
#         try:
#             status_data = response.json()
#             booking = get_object_or_404(CourtBooking, booking_id=pid)
            
#             if status_data.get('status') == "COMPLETE":
#                 booking.payment_status = 'completed'
#                 booking.transaction_id = status_data.get('ref_id')
#                 booking.is_booked = True
#                 booking.save()
#                 # Redirect to success page
#                 return redirect(f"{settings.FRONTEND_URL}/payment-success")
#             else:
#                 booking.payment_status = 'failed'
#                 booking.is_booked = False
#                 booking.save()
#                 return redirect(f"{settings.FRONTEND_URL}/payment-failed")
                
#         except Exception as e:
#             print("Error checking payment status:", str(e))
#             return redirect(f"{settings.FRONTEND_URL}/payment-failed")
        

#final change:
# class PaymentSuccessView(APIView):
#     permission_classes = [AllowAny]
    
#     def get(self, request):
#         try:
#             # Get the Base64 encoded response
#             encoded_response = request.GET.get('data')
#             if not encoded_response:
#                 print("No encoded response received")
#                 return redirect(f"{settings.FRONTEND_URL}/payment-failed")

#             # Decode the Base64 response
#             decoded_bytes = base64.b64decode(encoded_response)
#             decoded_data = json.loads(decoded_bytes.decode('utf-8'))
            
#             print("Decoded eSewa Response:", decoded_data)
            
#             # Extract values from decoded data
#             transaction_uuid = decoded_data.get('transaction_uuid')
#             status = decoded_data.get('status')
#             total_amount = decoded_data.get('total_amount')
            
#             # Extract booking_id from transaction_uuid (format: "id-timestamp")
#             booking_id = transaction_uuid.split('-')[0] if transaction_uuid else None
            
#             if not booking_id:
#                 print("No booking ID found in transaction_uuid")
#                 return redirect(f"{settings.FRONTEND_URL}/payment-failed")
            
#             booking = get_object_or_404(CourtBooking, booking_id=booking_id)
            
#             if status == "COMPLETE":
#                 # Verify transaction status
#                 verify_url = "https://rc.esewa.com.np/api/epay/transaction/status/"
#                 verify_params = {
#                     'product_code': settings.ESEWA_MERCHANT_ID,
#                     'transaction_uuid': transaction_uuid,
#                     'total_amount': total_amount
#                 }
                
#                 verify_response = requests.get(verify_url, params=verify_params)
#                 verify_data = verify_response.json()
                
#                 if verify_data.get('status') == "COMPLETE":
#                     booking.payment_status = 'completed'
#                     booking.transaction_id = decoded_data.get('transaction_code')
#                     booking.is_booked = True
#                     booking.save()
#                     return redirect(f"{settings.FRONTEND_URL}/payment-success")
            
#             booking.payment_status = 'failed'
#             booking.is_booked = False
#             booking.save()
#             return redirect(f"{settings.FRONTEND_URL}/payment-failed")
                
#         except Exception as e:
#             print("Error processing payment response:", str(e))
#             return redirect(f"{settings.FRONTEND_URL}/payment-failed")


#finalfinal change:
class PaymentSuccessView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            # Get the Base64 encoded response
            encoded_response = request.GET.get('data')
            if not encoded_response:
                print("No encoded response received")
                return redirect(f"{settings.FRONTEND_URL}/payment-failed")

            # Decode the Base64 response
            decoded_bytes = base64.b64decode(encoded_response)
            decoded_data = json.loads(decoded_bytes.decode('utf-8'))
            
            print("Decoded eSewa Response:", decoded_data)
            
            # Extract values from decoded data
            transaction_uuid = decoded_data.get('transaction_uuid')
            status = decoded_data.get('status')
            # total_amount = decoded_data.get('total_amount')
            total_amount = decoded_data.get('total_amount').replace(',', '')
            
            # Extract booking_id from transaction_uuid (format: "id-timestamp")
            booking_id = transaction_uuid.split('-')[0] if transaction_uuid else None
            
            if not booking_id:
                print("No booking ID found in transaction_uuid")
                return redirect(f"{settings.FRONTEND_URL}/payment-failed")
            
            booking = get_object_or_404(CourtBooking, booking_id=booking_id)
            
            if status == "COMPLETE":
                # Verify transaction status
                verify_url = "https://rc.esewa.com.np/api/epay/transaction/status/"
                verify_params = {
                    'product_code': settings.ESEWA_MERCHANT_ID,
                    'transaction_uuid': transaction_uuid,
                    'total_amount': total_amount
                }
                
                verify_response = requests.get(verify_url, params=verify_params)
                verify_data = verify_response.json()
                
                if verify_data.get('status') == "COMPLETE":
                    booking.payment_status = 'completed'
                    booking.transaction_id = decoded_data.get('transaction_code')
                    booking.is_booked = True
                    booking.save()

                    schedule = booking.schedule
                    schedule.is_booked = True
                    schedule.save()
                    return redirect(f"{settings.FRONTEND_URL}/payment-success")
            
            booking.payment_status = 'failed'
            booking.is_booked = False
            booking.save()
            return redirect(f"{settings.FRONTEND_URL}/payment-failed")
                
        except Exception as e:
            print("Error processing payment response:", str(e))
            return redirect(f"{settings.FRONTEND_URL}/payment-failed")

# class PaymentSuccessView(APIView):
#     permission_classes = [AllowAny]
#     def get(self, request):
#         pid = request.GET.get('oid')
#         refId = request.GET.get('refId')
#         amount = request.GET.get('amt')

#         verify_url = "https://uat.esewa.com.np/epay/transrec"
#         data = {
#             'amt': amount,
#             'rid': refId,
#             'pid': pid,
#             'scd': settings.ESEWA_MERCHANT_ID,
#         }
#         response = requests.post(verify_url, data=data)
#         booking = get_object_or_404(CourtBooking, booking_id=pid)
#         print(response.text)
#         if "COMPLETE" in response.text:
#             booking.payment_status = 'completed'
#             booking.transaction_id = refId
#             booking.is_booked = True
#             booking.save()
#             # Redirect to a success page of your choice.
#             return redirect(f"{settings.FRONTEND_URL}/token-verification")
#         else:
#             booking.payment_status = 'failed'
#             booking.is_booked = False
#             booking.save()
#             return redirect(f"{settings.FRONTEND_URL}/payment-failed")

class PaymentFailedView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        pid = request.GET.get('oid')
        if pid:
            booking = get_object_or_404(CourtBooking, booking_id=pid)
            booking.payment_status = 'failed'
            booking.is_booked = False
            booking.save()
        print("Error in paymentfailedview")
        print(pid)
        return redirect(f"{settings.FRONTEND_URL}/payment-failed")

# from django.shortcuts import redirect, get_object_or_404
# from django.conf import settings
# from django.urls import reverse
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from court_booking.models import CourtBooking
# import requests

# class InitiatePaymentView(APIView):
#     # permission_classes = [IsAuthenticated]

#     def post(self, request, booking_id):
#         booking = get_object_or_404(CourtBooking, booking_id=booking_id)
#         amount = booking.schedule.facility.price_per_hour
#         transaction_id = booking.booking_id
#         print(amount, transaction_id)

#         esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
#         payload = {
#             'amt': amount,
#             'txAmt': 0,
#             'psc': 0,
#             'pdc': 0,
#             'tAmt': amount,
#             'pid': transaction_id,
#             'scd': settings.ESEWA_MERCHANT_ID,
#             'su': request.build_absolute_uri(reverse('payment-success')),
#             'fu': request.build_absolute_uri(reverse('payment-failed')),
#         }

#         query_string = "&".join(["{}={}".format(k, v) for k, v in payload.items()])
#         final_url = esewa_url + '?' + query_string
#         return redirect(final_url)

# class PaymentSuccessView(APIView):
#     def get(self, request):
#         pid = request.GET.get('oid')
#         refId = request.GET.get('refId')
#         amount = request.GET.get('amt')

#         verify_url = "https://uat.esewa.com.np/epay/transrec"
#         data = {
#             'amt': amount,
#             'rid': refId,
#             'pid': pid,
#             'scd': settings.ESEWA_MERCHANT_ID,
#         }
#         response = requests.post(verify_url, data=data)
#         booking = get_object_or_404(CourtBooking, booking_id=pid)
#         if "Success" in response.text:
#             booking.payment_status = 'completed'
#             booking.transaction_id = refId
#             booking.is_booked = True
#             booking.save()
#             # Redirect to a booking success page (update your URL name as needed)
#             return redirect(reverse('booking-success'))
#         else:
#             booking.payment_status = 'failed'
#             booking.is_booked = False
#             booking.save()
#             # Redirect back to the booking page (update your URL name as needed)
#             return redirect(reverse('booking-page'))

# class PaymentFailedView(APIView):
#     def get(self, request):
#         pid = request.GET.get('oid')
#         # Optionally update the booking as failed if needed
#         if pid:
#             booking = get_object_or_404(CourtBooking, booking_id=pid)
#             booking.payment_status = 'failed'
#             booking.is_booked = False
#             booking.save()
#         # Redirect back to the booking page
#         return redirect(reverse('booking-page'))

# # from django.shortcuts import render, redirect, get_object_or_404
# # from django.conf import settings
# # from django.urls import reverse
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework.permissions import IsAuthenticated
# # from court_booking.models import CourtBooking
# # import requests

# # class InitiatePaymentView(APIView):
# #     permission_classes = [IsAuthenticated]

# #     def post(self, request, booking_id):
# #         booking = get_object_or_404(CourtBooking, booking_id=booking_id)
# #         amount = booking.schedule.facility.price_per_hour
# #         transaction_id = booking.booking_id

# #         # esewa_url = "https://uat.esewa.com.np/epay/main"
# #         esewa_url = "https://epay.esewa.com.np/api/epay/main/v2/form "
# #         # esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
# #         payload = {
# #             'amt': amount,
# #             'txAmt': 0,
# #             'psc': 0,
# #             'pdc': 0,
# #             'tAmt': amount,
# #             'pid': transaction_id,
# #             'scd': settings.ESEWA_MERCHANT_ID,
# #             'su': request.build_absolute_uri(reverse('payment-success')),
# #             'fu': request.build_absolute_uri(reverse('payment-failed')),
# #         }

# #         query_string = "&".join(["{}={}".format(k, v) for k, v in payload.items()])
# #         final_url = esewa_url + '?' + query_string
# #         print(final_url)
# #         return redirect(final_url)

# # class PaymentSuccessView(APIView):
# #     def get(self, request):
# #         pid = request.GET.get('oid')
# #         refId = request.GET.get('refId')
# #         amount = request.GET.get('amt')

# #         verify_url = "https://uat.esewa.com.np/epay/transrec"
# #         data = {
# #             'amt': amount,
# #             'rid': refId,
# #             'pid': pid,
# #             'scd': settings.ESEWA_MERCHANT_ID,
# #         }
# #         response = requests.post(verify_url, data=data)
# #         if "Success" in response.text:
# #             booking = get_object_or_404(CourtBooking, booking_id=pid)
# #             booking.payment_status = 'completed'
# #             booking.transaction_id = refId
# #             booking.save()
# #             return Response({'message': 'Payment successful'})
# #         else:
# #             return Response({'error': 'Payment verification failed'}, status=400)

# # class PaymentFailedView(APIView):
# #     def get(self, request):
# #         return Response({'error': 'Payment failed'}, status=400)