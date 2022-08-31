from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status

from .serializer import UserSerializer, TokenSerializer
from .models import User


class UserAPIView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


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
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
