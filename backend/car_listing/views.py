from rest_framework.decorators import api_view
from rest_framework import mixins, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CarAdSerializer
from .models import CarAd


class CarAdsListAPIView(APIView):
    def get(self, request):
        queryset = CarAd.objects.filter(user=request.user)
        serializer = CarAdSerializer(queryset, many=True)
        return Response(serializer.data)


class CarAdAPIView(mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = CarAdSerializer
    queryset = CarAd.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
