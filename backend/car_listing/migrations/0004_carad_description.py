# Generated by Django 4.1 on 2022-09-01 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_listing', '0003_carad_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='carad',
            name='description',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
