from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from product_management.models import Product
from product_management.serializers import ProductSerializer  # ถ้าต้องการส่งข้อมูลสินค้าแบบละเอียด


from rest_framework import generics
from .serializers import CartSerializer

class CartDetailView(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'session_id'

class AddToCartView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not all([session_id, product_id]):
            return Response({'error': 'Missing required fields'}, status=400)

        try:
            cart, _ = Cart.objects.get_or_create(session_id=session_id)
            product = Product.objects.get(id=product_id)
            item, created = CartItem.objects.get_or_create(cart=cart, product=product)

            if not created:
                item.quantity += int(quantity)
            else:
                item.quantity = int(quantity)
            item.save()

            return Response({'message': 'Added to cart'}, status=200)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

class CartSummaryView(APIView):
    def get(self, request, session_id):
        try:
            cart = Cart.objects.get(session_id=session_id)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_items = CartItem.objects.filter(cart=cart)

        item_list = []
        subtotal = 0

        for item in cart_items:
            total = item.total_price()
            subtotal += total

            item_list.append({
                "product_id": item.product.id,
                "nameEN": item.product.nameEN,
                "nameTH": item.product.nameTH,
                "size": item.product.size,
                "image": item.product.image if item.product.image else "",
                "price": item.product.price,
                "quantity": item.quantity,
                "total_price": total
            })

        return Response({
            "items": item_list,
            "subtotal": subtotal,
            "shipping": 30,
            "estimated_total": subtotal + 30
        }, status=status.HTTP_200_OK)
        

class DeleteCartItem(APIView):
    def post(self, request): 
        session_id = request.data.get("session_id")
        product_id = request.data.get("product_id")

        try:
            cart = Cart.objects.get(session_id=session_id)
            item = CartItem.objects.get(cart=cart, product_id=product_id)
            item.delete()
            return Response({"message": "Item removed from cart"}, status=200)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return Response({"error": "Item or cart not found"}, status=404)

