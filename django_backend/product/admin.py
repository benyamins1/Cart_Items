from django.contrib import admin

# Register your models here.
# from django.contrib.auth.admin import UserAdmin
from .models import  Product, Category,Cart,CartItem

admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(CartItem)
