# Generated by Django 4.1 on 2022-09-01 16:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_listing', '0007_alter_carad_fuel_alter_carad_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carad',
            name='distance_covered',
            field=models.IntegerField(blank=True, default=0, null=True, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]