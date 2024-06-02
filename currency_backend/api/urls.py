from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurrencyRateViewSet

router = DefaultRouter()
router.register(r'currency-rates', CurrencyRateViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
