# Generated by Django 4.1 on 2022-09-01 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_listing', '0005_remove_carad_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='carad',
            name='color',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='carad',
            name='engine_capacity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
