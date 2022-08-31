from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdminView(admin.ModelAdmin):
    list_display = ['id', 'email', 'name',
                    'gender', 'city', 'is_admin', 'created', 'updated']
    list_editable = ['gender', 'city']
