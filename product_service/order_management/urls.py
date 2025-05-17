from django.urls import path
# from .views import OrderCreateView, OrderListView
from .views import CheckoutOrderView

urlpatterns = [
    path('checkout/', CheckoutOrderView.as_view(), name='checkout'),
]
