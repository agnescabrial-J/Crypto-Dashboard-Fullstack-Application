import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.cache import cache

BASE_URL = "https://api.coingecko.com/api/v3"

@api_view(['GET'])
def market_chart(request):
    coin = request.GET.get('coin', 'bitcoin')
    days = request.GET.get('days', '7')

    cache_key = f"market_chart_{coin}_{days}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    url = f"{BASE_URL}/coins/{coin}/market_chart"
    params = {
        'vs_currency': 'usd',
        'days': days
    }

    response = requests.get(url, params=params).json()

    cache.set(cache_key, response, timeout=60)
    return Response(response)


@api_view(['GET'])
def top_gainer(request):
    cache_key = "top_gainer"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    url = f"{BASE_URL}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'price_change_percentage_24h_desc',
        'per_page': 1,
        'page': 1
    }

    data = requests.get(url, params=params).json()[0]
    cache.set(cache_key, data, timeout=60)

    return Response(data)


@api_view(['GET'])
def top_loser(request):
    cache_key = "top_loser"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    url = f"{BASE_URL}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'price_change_percentage_24h_asc',
        'per_page': 1,
        'page': 1
    }

    data = requests.get(url, params=params).json()[0]
    cache.set(cache_key, data, timeout=60)

    return Response(data)

