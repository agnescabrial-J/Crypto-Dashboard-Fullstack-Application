import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

BASE_URL = "https://api.coingecko.com/api/v3"

@api_view(['GET'])
def market_chart(request):
    coin = request.GET.get('coin', 'bitcoin')
    days = request.GET.get('days', '7')

    url = f"{BASE_URL}/coins/{coin}/market_chart"
    params = {
        'vs_currency': 'usd',
        'days': days
    }

    response = requests.get(url, params=params)
    return Response(response.json())


@api_view(['GET'])
def top_gainer(request):
    url = f"{BASE_URL}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'price_change_percentage_24h_desc',
        'per_page': 1,
        'page': 1
    }

    data = requests.get(url, params=params).json()
    return Response(data[0])


@api_view(['GET'])
def top_loser(request):
    url = f"{BASE_URL}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'price_change_percentage_24h_asc',
        'per_page': 1,
        'page': 1
    }

    data = requests.get(url, params=params).json()
    return Response(data[0])
