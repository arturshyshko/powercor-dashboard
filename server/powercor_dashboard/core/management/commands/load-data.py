from django.core.management.base import BaseCommand

from dashboard.models import *


class Command(BaseCommand):
    help = 'Load default choices and info into DB.'

    def handle(self, *args, **options):
        Client.objects.get_or_create(name='Beon', defaults={'weight': 1})
        Client.objects.get_or_create(name='EN', defaults={'weight': 1})

        BusinessImportanceChoice.objects.get_or_create(choice='Low', defaults={'weight': 1})
        BusinessImportanceChoice.objects.get_or_create(choice='Average', defaults={'weight': 2})
        BusinessImportanceChoice.objects.get_or_create(choice='High', defaults={'weight': 3})

        ResourcesChoice.objects.get_or_create(choice='Fully Resourced', defaults={'weight': 1})
        ResourcesChoice.objects.get_or_create(choice='Under Resourced', defaults={'weight': 2})
        ResourcesChoice.objects.get_or_create(choice='No Resources', defaults={'weight': 3})

        StageChoice.objects.get_or_create(choice='IFC', defaults={'weight': 3})

        StatusChoice.objects.get_or_create(choice='On Time', defaults={'weight': 1})
        StatusChoice.objects.get_or_create(choice='Late', defaults={'weight': 2})
        StatusChoice.objects.get_or_create(choice='Missed', defaults={'weight': 3})
