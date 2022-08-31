from django.urls import path
from .views import UserAPIView, UserLoginAPIView, UserRegisterAPIView


urlpatterns = [
    path('', UserAPIView.as_view(), name="userapi"),
    path('login/', UserLoginAPIView.as_view(), name="login_api"),
    path('register/', UserRegisterAPIView.as_view(), name="register_api")
]
