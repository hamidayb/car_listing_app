from django.urls import path
from .views import CarAdsListAPIView, CarAdAPIView

urlpatterns = [
    path('my/', CarAdsListAPIView.as_view(), name='ads_list_api'),
    path('<int:pk>/', CarAdAPIView.as_view(), name='ads_api'),
]
