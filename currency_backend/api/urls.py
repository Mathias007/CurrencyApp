from django.urls import path
from .views import fetch_rates, download_currency_rates, get_currency_rates_by_period

urlpatterns = [
    path('download-currency-rates/', download_currency_rates, name='download_currency_rates'),
    path('fetch-currency-rates-general/', fetch_rates, name='fetch_rates'),
    path('fetch-currency-rates-period/<str:period>/', get_currency_rates_by_period, name='get_currency_rates_by_period'),
]
