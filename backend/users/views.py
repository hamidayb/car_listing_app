from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status

from .serializer import UserSerializer, TokenSerializer
from .middlewares import TokenAuthMiddleware
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
        return Response(serializer.errors)


class UserLoginAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
            if user and user.check_password(password):
                token = Token.objects.get(user=user)
                token_serializer = TokenSerializer(token)
                return Response(token_serializer.data)
            else:
                return Response({"error": "Invalid email or password"})

        except User.DoesNotExist as usererror:
            return Response(data={"message": "User not found", "error": str(usererror)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={"message": "Something went wrong", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterAPIView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
