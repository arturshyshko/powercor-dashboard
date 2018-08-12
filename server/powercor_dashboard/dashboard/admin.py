from django.contrib import admin

from .models.user import PowercorUser
from .models.client import Client
from .models.manager import Manager
from .models.discipline import Discipline
from .models.project import Project

from .models.choices import *


class DisciplineInline(admin.TabularInline):
    model = Discipline


class ProjectAdmin(admin.ModelAdmin):
    inlines = [DisciplineInline]


admin.site.register(PowercorUser)

admin.site.register(Client)
admin.site.register(Manager)
admin.site.register(Discipline)
admin.site.register(Project, ProjectAdmin)

admin.site.register(BusinessImportanceChoice)
admin.site.register(ResourcesChoice)
admin.site.register(StageChoice)
admin.site.register(StatusChoice)
