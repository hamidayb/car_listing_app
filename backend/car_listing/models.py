from django.utils import timezone
from django.db import models
from django.core.validators import MinValueValidator
from users.models import User


class CarAd(models.Model):
    class TypeChoices(models.TextChoices):
        SEDAN = 'sedan', 'Sedan'
        SUV = 'suv', 'SUV'
        COUPE = 'coupe', 'Coupe'
        MINIVAN = 'minivan', 'MiniVan'
        SPORTS_CAR = 'sports_car', 'Sports Car'
        HATCHBACK = 'hatchback', 'Hatch Back'
        PICKUP_TRUCL = 'pickup_truck', 'Pickup Truck'

    class FuelChoices(models.TextChoices):
        PETROL = 'petrol', 'Petrol'
        DIESEL = 'diesel', 'Diesel'
        CNG = 'cng', 'CNG'
        BIO_DIESEL = 'bio_diesel', 'Bio Diesel'
        LPG = 'lgp', 'LPG'

    class ConditionChoices(models.TextChoices):
        USED = 'used', 'Used'
        NEW = 'new', 'New'

    class HybridChoices(models.TextChoices):
        FULLY = 'full', 'Fully Hybrid'
        MILD = 'mild', 'Mild Hybrid'
        PLUGIN = 'plugin', 'Plug-in Hyrbid'

    class TransmissionChoices(models.TextChoices):
        AUTO = 'auto', 'Automatic'
        MANUAL = 'manual', 'Manual'

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, null=True, blank=True)
    model = models.CharField(max_length=100)
    make = models.CharField(max_length=100)
    type = models.CharField(
        max_length=50, choices=TypeChoices.choices, default=TypeChoices.SEDAN)
    year = models.IntegerField()
    transmission = models.TextField(
        max_length=50, choices=TransmissionChoices.choices, default=TransmissionChoices.MANUAL)
    condition = models.TextField(
        max_length=50, choices=ConditionChoices.choices, default=ConditionChoices.NEW)
    registration_city = models.CharField(max_length=100)
    hybrid = models.TextField(
        max_length=50, choices=HybridChoices.choices, null=True, blank=True)
    fuel = models.CharField(
        max_length=50, choices=FuelChoices.choices, default=None)
    distance_covered = models.IntegerField(validators=[MinValueValidator(0)])
    price = models.IntegerField(validators=[MinValueValidator(100000)])
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.updated = timezone.now()
        super().save(*args, **kwargs)
