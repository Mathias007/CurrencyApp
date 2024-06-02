from rest_framework import viewsets
from .models import CurrencyRate
from .serializers import CurrencyRateSerializer

class CurrencyRateViewSet(viewsets.ModelViewSet):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer
