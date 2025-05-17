from django.db import models

class Product(models.Model):
    nameEN = models.CharField(max_length=255)
    nameTH = models.CharField(max_length=255)
    size = models.CharField(max_length=20)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)
    is_bestseller = models.BooleanField(default=False)
    
    htu = models.TextField()
    warning = models.TextField() 
    ingredient = models.TextField() 
    
class User(models.Model):
    pass