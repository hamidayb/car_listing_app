# Generated by Django 4.1 on 2022-09-01 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default='avatar.png', null=True, upload_to='../static/images/users'),
        ),
    ]