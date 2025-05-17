from django.urls import path
from .views import AddToCartView, CartSummaryView, CartDetailView, DeleteCartItem

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add_to_cart'),
    path('summary/<str:session_id>/', CartSummaryView.as_view()),
    path('<str:session_id>/', CartDetailView.as_view(), name='cart-detail'),
    path('delete/', DeleteCartItem.as_view(), name='delete_cart'),
]