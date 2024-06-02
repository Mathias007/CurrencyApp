from django.db import models

class CurrencyRate(models.Model):
    date = models.DateField()
    value = models.DecimalField(max_digits=10, decimal_places=4)
