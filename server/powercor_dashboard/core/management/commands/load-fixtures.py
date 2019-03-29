from django.conf import settings

from django.core.management.base import BaseCommand
from core.models.user import User


class Command(BaseCommand):
    help = 'Load fixtures to db'

    def handle(self, *args, **options):
        if settings.APP_ENV == 'prod':
            print('Loading fixtures is turned off for production environment')
            return

        user, _ = User.objects.get_or_create(
            email='test@chimplie.com',
            defaults={
                'is_staff': True,
                'is_superuser': True,
            }
        )
        user.set_password('Admin1234')

        user.save()
