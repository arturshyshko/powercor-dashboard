from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# from .models.user import PowercorUser

from .models.client import Client
from .models.manager import Manager
from .models.discipline import Discipline
from .models.project import Project

from .models.choices import *


class DisciplineInline(admin.TabularInline):
    model = Discipline


class ProjectAdmin(admin.ModelAdmin):
    inlines = [DisciplineInline]


admin.site.register(Client)
admin.site.register(Manager)
admin.site.register(Discipline)
admin.site.register(Project, ProjectAdmin)

admin.site.register(BusinessImportanceChoice)
admin.site.register(ResourcesChoice)
admin.site.register(StageChoice)
admin.site.register(StatusChoice)


# @admin.register(PowercorUser)
class PowercorUserAdmin(UserAdmin):
    """
    Admin model for Powercor User
    """
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
            }),
    )

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')})
    )

    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
