from django.urls import path
from .views import AdAPIView, MyAdAPIView, MyAdsListAPIView, AllAdsAPIView

urlpatterns = [
    path('my/<slug>/', MyAdAPIView.as_view(), name='my_ad_api'),
    path('my/', MyAdsListAPIView.as_view(), name='my_all_ads_api'),
    path('<slug>/', AdAPIView.as_view(), name='ad_api'),
    path('', AllAdsAPIView.as_view(), name='all_ads_api'),
]
