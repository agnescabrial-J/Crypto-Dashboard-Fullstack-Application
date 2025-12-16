from django.urls import path
from .views import market_chart, top_gainer, top_loser

urlpatterns = [
    path('market-chart/', market_chart),
    path('top-gainer/', top_gainer),
    path('top-loser/', top_loser),
]
