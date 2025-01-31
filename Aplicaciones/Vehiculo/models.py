from django.db import models

# Create your models here.


class vehicle(models.Model):
    placa = models.CharField(primary_key=True,max_length=6,on_delete=models.CASCADE)
    tipo = models.CharField(20, null=False)
    marca = models.CharField(max_length=100, null=False)
    cilindraje = models.PositiveIntegerField(null=False)
