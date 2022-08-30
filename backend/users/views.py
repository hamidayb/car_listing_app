from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status

from django.utils.decorators import method_decorator

from .serializer import UserSerializer, TokenSerializer
from .middlewares import TokenAuthMiddleware
from .models import User


class UserAPIView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @method_decorator(TokenAuthMiddleware)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class UserLoginAPIView(APIView):
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

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
