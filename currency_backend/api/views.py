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
from django.db.models.functions import TruncYear, TruncMonth, TruncDay
from django.db.models import Avg

@api_view(['POST'])
def download_currency_rates(request):
    fetch_currency_rates_nbp() 
    return Response({'message': 'Fetching currency rates in progress...'})

@api_view(['GET'])
def fetch_rates(request):
    currency_rates = CurrencyRate.objects.all()
    serializer = CurrencyRateSerializer(currency_rates, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_currency_rates_by_period(request, period):
    if period == 'year':
        rates = CurrencyRate.objects.annotate(period=TruncYear('date')).values('period', 'code').annotate(avg_value=Avg('value')).order_by('period', 'code')
    elif period == 'month':
        rates = CurrencyRate.objects.annotate(period=TruncMonth('date')).values('period', 'code').annotate(avg_value=Avg('value')).order_by('period', 'code')
    elif period == 'day':
        rates = CurrencyRate.objects.annotate(period=TruncDay('date')).values('period', 'code').annotate(avg_value=Avg('value')).order_by('period', 'code')
    else:
        return Response({"error": "Invalid period"}, status=400)

    return Response(rates)
