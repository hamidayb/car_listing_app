from django.utils import timezone
from django.db import models
from django.core.validators import MinValueValidator
from users.models import User
from .utils import unique_slug


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
        User, on_delete=models.CASCADE, null=True, blank=True)
    slug = models.SlugField(max_length=200, null=True)
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
        max_length=50, choices=FuelChoices.choices, null=True, blank=True)
    distance_covered = models.IntegerField(
        validators=[MinValueValidator(0)], default=0)
    price = models.IntegerField(validators=[MinValueValidator(100000)])
    image = models.ImageField(
        upload_to='../static/images/cars', null=True, blank=True, default='avatar.png')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        slug_str = "%s %s %d" % (self.make, self.model, self.year)
        self.slug = unique_slug(slug_str)
        self.updated = timezone.now()
        super().save(*args, **kwargs)
