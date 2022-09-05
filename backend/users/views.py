from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins

from .serializer import UserSerializer, TokenSerializer, RegisterSerializer
from .models import User


class UserAPIView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        raise ValidationError(serializer.errors)


class UserLoginAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise ValidationError("Email is not registered!")

        if(not user):
            raise ValidationError("Email is not registered!")

        if not user.check_password(password):
            raise ValidationError("Invalid Password!")

        try:
            token = Token.objects.get(user=user)
            token_serializer = TokenSerializer(token)
            return Response(token_serializer.data)
        except Token.DoesNotExist:
            raise ValidationError("Not authorized")


class UserRegisterAPIView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = RegisterSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
