from django.contrib import admin

from .models.approved_variation import ApprovedVariation
from .models.client import Client
from .models.discipline import Discipline
from .models.project import Project

from .models.choices import *


class DisciplineInline(admin.TabularInline):
    model = Discipline


class ProjectAdmin(admin.ModelAdmin):
    inlines = [DisciplineInline]


class ApprovedVariationInline(admin.TabularInline):
    model = ApprovedVariation


class DisciplineAdmin(admin.ModelAdmin):
    inlines = [ApprovedVariationInline]


admin.site.register(Client)
admin.site.register(ApprovedVariation)
admin.site.register(Discipline, DisciplineAdmin)
admin.site.register(Project, ProjectAdmin)

admin.site.register(BusinessImportanceChoice)
admin.site.register(ResourcesChoice)
admin.site.register(StageChoice)
admin.site.register(StatusChoice)
