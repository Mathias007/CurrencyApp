# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import CurrencyRateViewSet

# router = DefaultRouter()
# router.register(r'currency-rates', CurrencyRateViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

from django.urls import path
from .views import fetch_rates, download_currency_rates

urlpatterns = [
    path('fetch-currency-rates/', fetch_rates, name='fetch_rates'),
    path('download-currency-rates/', download_currency_rates, name='download_currency_rates'),
]