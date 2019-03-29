from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Load default choices and info into DB.'

    def handle(self, *args, **options):
        pass
