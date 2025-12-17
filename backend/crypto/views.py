import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.cache import cache

BASE_URL = "https://api.coingecko.com/api/v3"
CACHE_TIMEOUT = 60


@api_view(['GET'])
def market_chart(request):
    coin = request.GET.get('coin', 'bitcoin')
    days = request.GET.get('days', '7')

    cache_key = f"market_chart_{coin}_{days}"
    cached = cache.get(cache_key)

    if cached:
        return Response(cached)

    url = f"{BASE_URL}/coins/{coin}/market_chart"
    params = {"vs_currency": "usd", "days": days}

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 429:
            return Response({"prices": []}, status=200)

        if response.status_code != 200:
            return Response({"error": "Upstream failed"}, status=500)

        data = response.json()
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return Response(data)

    except requests.exceptions.RequestException:
        return Response({"error": "CoinGecko unreachable"}, status=500)


@api_view(['GET'])
def top_gainer(request):
    cache_key = "top_gainer"
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

    url = f"{BASE_URL}/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "price_change_percentage_24h_desc",
        "per_page": 1,
        "page": 1
    }

    response = requests.get(url, params=params, timeout=10)
    if response.status_code == 200:
        data = response.json()[0]
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return Response(data)

    return Response({}, status=200)


@api_view(['GET'])
def top_loser(request):
    cache_key = "top_loser"
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

    url = f"{BASE_URL}/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "price_change_percentage_24h_asc",
        "per_page": 1,
        "page": 1
    }

    response = requests.get(url, params=params, timeout=10)
    if response.status_code == 200:
        data = response.json()[0]
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return Response(data)

    return Response({}, status=200)
