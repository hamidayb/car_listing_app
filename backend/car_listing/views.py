from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import mixins, generics
from rest_framework.views import APIView

from .serializers import CarAdSerializer
from .models import CarAd


class AllAdsAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        queryset = CarAd.objects.all()
        serializer = CarAdSerializer(queryset, many=True)
        return Response(serializer.data)


class AdAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, slug):
        car_ad = CarAd.objects.get(slug=slug)
        serializer = CarAdSerializer(car_ad)
        return Response(serializer.data)


class MyAdsListAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

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
        raise ValidationError(serializer.errors)


class MyAdAPIView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    serializer_class = CarAdSerializer
    lookup_field = 'slug'
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        queryset = CarAd.objects.filter(user=self.request.user.id)
        return queryset

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, slug):
        try:
            car_ad = CarAd.objects.get(slug=slug)
            car_ad.delete()
            return Response('Ad deleted successfulyy')
        except CarAd.DoesNotExist:
            raise ValidationError("Ad doesnot exists")

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
