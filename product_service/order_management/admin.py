from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'email', 'payment_cod', 'created_at']
    inlines = [OrderItemInline]
    search_fields = ['full_name', 'email']
    list_filter = ['created_at', 'payment_cod']