from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
]

# GET /products/  รายการสินค้า
# POST /products/  เพิ่มสินค้า
# GET /products/<id>/  ดูสินค้าตัวเดียว
# PUT /products/<id>/  อัปเดตสินค้า
# PATCH /products/<id>/  อัปเดตบางส่วน
# DELETE /products/<id>/  ลบสินค้า