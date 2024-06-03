from django.db import models

class CurrencyRate(models.Model):
    date = models.DateField()
    currency = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    value = models.DecimalField(max_digits=10, decimal_places=4)
