# Generated by Django 4.1 on 2022-09-05 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_listing', '0009_alter_carad_fuel_alter_carad_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carad',
            name='slug',
            field=models.SlugField(blank=True, editable=False, max_length=200),
        ),
    ]