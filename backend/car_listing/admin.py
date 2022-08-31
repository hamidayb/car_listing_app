from django.contrib import admin
from .models import CarAd


@admin.register(CarAd)
class CarAdAdminView(admin.ModelAdmin):
    list_display = ['model', 'user', 'make', 'type', 'year', 'transmission', 'condition', 'registration_city', 'fuel',
                    'distance_covered', 'price', 'created', 'updated']

    list_filter = ['type', 'hybrid']
    list_display_links = ['model']
