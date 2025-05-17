from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from cart_management.models import Cart, CartItem
from product_management.models import Product

class CheckoutOrderView(APIView):
    def post(self, request):
        data = request.data
        session_id = data.get("session_id")

        if not session_id:
            return Response({"error": "Missing session_id"}, status=400)

        try:
            cart = Cart.objects.get(session_id=session_id)
            cart_items = cart.items.all()
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=404)

        try:
            order = Order.objects.create(
                full_name=data.get("full_name", ""),
                address=data.get("address", ""),
                phone=data.get("phone", ""),
                email=data.get("email", ""),
                payment_cod=data.get("payment_cod", True)
            )
        except Exception as e:
            return Response({"error": f"Error creating order: {str(e)}"}, status=500)

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart.delete()

        return Response({"message": "Order created successfully"}, status=201)