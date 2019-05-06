from subprocess import call

from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings


class Command(BaseCommand):
    help = 'Prepare application for running (create DB, run migrations, etc).'

    def handle(self, *args, **options):
        if settings.CREATE_DATABASE:
            call_command('createdb')

        if settings.RUN_MIGRATIONS:
            call_command('migrate', interactive=False)

        if settings.LOAD_DATA:
            call_command('load-data')

        if settings.LOAD_FIXTURES:
            call_command('load-fixtures')

        if settings.COLLECT_STATIC:
            print('Loading static files.')
            call_command('collectstatic', interactive=False)
