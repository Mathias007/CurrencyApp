from django.test import TestCase
from .models import CurrencyRate
from .tasks import fetch_currency_rates_nbp
from datetime import date

class CurrencyRateTestCase(TestCase):
    def setUp(self):
        CurrencyRate.objects.create(date='2023-01-01', value=4.1234)

    def test_currency_rate(self):
        rate = CurrencyRate.objects.get(date='2023-01-01')
        self.assertEqual(float(rate.value), 4.1234)

    def test_create_currency_rate(self):
        rate = CurrencyRate.objects.create(date=date.today(), currency='USD', code='USD', value=4.5)
        self.assertEqual(rate.currency, 'USD')

    def test_fetch_currency_rates(self):
        fetch_currency_rates_nbp()
        rates = CurrencyRate.objects.all()
        self.assertGreater(len(rates), 0)
