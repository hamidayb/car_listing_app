from django.urls import path
from .views import UserAPIView, UserLoginAPIView, UserRegisterAPIView


urlpatterns = [
    path('', UserAPIView.as_view(), name="userapi"),
    path('login/', UserLoginAPIView.as_view(), name="loginview"),
    path('register/', UserRegisterAPIView.as_view(), name="registerview")
]
