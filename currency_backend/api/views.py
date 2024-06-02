# from rest_framework import viewsets
# from .models import CurrencyRate
# from .serializers import CurrencyRateSerializer

# class CurrencyRateViewSet(viewsets.ModelViewSet):
#     queryset = CurrencyRate.objects.all()
#     serializer_class = CurrencyRateSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .tasks import fetch_currency_rates_nbp
from .models import CurrencyRate
from .serializers import CurrencyRateSerializer

@api_view(['POST'])
def download_currency_rates(request):
    fetch_currency_rates_nbp() 
    return Response({'message': 'Fetching currency rates in progress...'})

@api_view(['GET'])
def fetch_rates(request):
    currency_rates = CurrencyRate.objects.all()
    serializer = CurrencyRateSerializer(currency_rates, many=True)
    return Response(serializer.data)
