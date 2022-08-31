from django.contrib import admin
from .models import CarAd


@admin.register(CarAd)
class CarAdAdminView(admin.ModelAdmin):
    list_display = ['user', 'model', 'type', 'year', 'transmission', 'condition', 'registration_city', 'fuel',
                    'distance_covered', 'price', 'created', 'updated']

    list_filter = ['type', 'hybrid']
    # list_editable = ['type', 'transmission']
    list_display_links = ['model']
