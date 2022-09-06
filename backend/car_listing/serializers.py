from time import clock_getres
from rest_framework import serializers
from .models import CarAd


class CarAdSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarAd
        fields = '__all__'

    # def to_representation(self, instance):
    #     ret = super().to_representation(instance)
    #     ret['type'] = CarAd.TypeChoices(ret['type']).label
    #     ret['transmission'] = CarAd.TransmissionChoices(
    #         ret['transmission']).label
    #     ret['condition'] = CarAd.ConditionChoices(ret['condition']).label
    #     if(ret['hybrid']):
    #         ret['hybrid'] = CarAd.HybridChoices(ret['hybrid']).label
    #     if(ret['fuel']):
    #         ret['fuel'] = CarAd.FuelChoices(ret['fuel']).label
    #     return ret
