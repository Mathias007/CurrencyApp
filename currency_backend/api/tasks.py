import requests
from .models import CurrencyRate
from datetime import datetime, timedelta

def fetch_currency_rates_nbp():
    base_url = 'http://api.nbp.pl/api/exchangerates/tables/A'
    start_date = datetime.now() - timedelta(days=365) 
    end_date = datetime.now()

    current_date = start_date
    while current_date <= end_date:
        url = f'{base_url}/{current_date.strftime("%Y-%m-%d")}?format=json'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            for rate in data[0]['rates']:
                CurrencyRate.objects.create(
                    date=data[0]['effectiveDate'],
                    currency=rate['currency'],
                    code=rate['code'],
                    value=rate['mid']
                )
        current_date += timedelta(days=1)
