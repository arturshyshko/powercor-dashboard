from django.contrib import admin

from .models.client import Client
from .models.manager import Manager
from .models.discipline import Discipline
from .models.project import Project

from .models.choices import *


admin.site.register(Client)
admin.site.register(Manager)
admin.site.register(Discipline)
admin.site.register(Project)

admin.site.register(BusinessImportanceChoice)
admin.site.register(ResourcesChoice)
admin.site.register(StageChoice)
admin.site.register(StatusChoice)
