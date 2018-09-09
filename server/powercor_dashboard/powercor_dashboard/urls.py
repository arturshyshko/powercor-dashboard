"""powercor_dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from rest_framework.routers import DefaultRouter

from core.views.user import ProjectUserViewSet
from dashboard.views.approved_variation import ApprovedVariationViewSet
from dashboard.views.client import ClientViewSet
from dashboard.views.choices import *
from dashboard.views.discipline import DisciplineViewSet
from dashboard.views.project import ProjectViewSet


router = DefaultRouter()
router.register(r'users', ProjectUserViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'importances', BusinessImportanceChoiceViewSet)
router.register(r'resources', ResourcesChoiceViewSet)
router.register(r'stages', StageChoiceViewSet)
router.register(r'statuses', StatusChoiceViewSet)
router.register(r'disciplines', DisciplineViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'approved_variations', ApprovedVariationViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
]
