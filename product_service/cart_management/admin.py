from django.contrib import admin

from django.contrib import admin
from .models import Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['product', 'total_price']
    can_delete = False

    def total_price(self, obj):
        return obj.total_price()
    total_price.short_description = "Total Price"

class CartAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'created_at']
    search_fields = ['session_id']
    readonly_fields = ['created_at']
    inlines = [CartItemInline]

admin.site.register(Cart, CartAdmin)
