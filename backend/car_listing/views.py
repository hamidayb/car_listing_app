from rest_framework import mixins, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CarAdSerializer
from .models import CarAd


class AllAdsAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        queryset = CarAd.objects.all()
        serializer = CarAdSerializer(queryset, many=True)
        return Response(serializer.data)


class AdAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, slug):
        car_ad = CarAd.objects.get(slug=slug)
        serializer = CarAdSerializer(car_ad)
        return Response(serializer.data)


class MyAdsListAPIView(APIView):
    def get(self, request):
        queryset = CarAd.objects.filter(user=request.user)
        serializer = CarAdSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CarAdSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class MyAdAPIView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    serializer_class = CarAdSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = CarAd.objects.filter(user=self.request.user.id)
        return queryset

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, slug):
        car_ad = CarAd.objects.get(slug=slug)
        car_ad.delete()
        return Response('Ad deleted successfulyy')

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
