from django.test import TestCase
from .models import CurrencyRate

class CurrencyRateTestCase(TestCase):
    def setUp(self):
        CurrencyRate.objects.create(date='2023-01-01', value=4.1234)

    def test_currency_rate(self):
        rate = CurrencyRate.objects.get(date='2023-01-01')
        self.assertEqual(rate.value, 4.1234)
