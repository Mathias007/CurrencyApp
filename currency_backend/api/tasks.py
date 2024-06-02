import requests
from .models import CurrencyRate

def fetch_currency_rates():
    url = 'http://api.nbp.pl/api/exchangerates/tables/A?format=json'
    response = requests.get(url)
    data = response.json()

    for rate in data[0]['rates']:
        CurrencyRate.objects.create(
            date=data[0]['effectiveDate'],
            value=rate['mid']
        )
