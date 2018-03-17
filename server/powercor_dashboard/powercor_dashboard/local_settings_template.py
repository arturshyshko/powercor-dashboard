# Getting default setting for the project
from .default_settings import *

# Appending localhost to allowed hosts
ALLOWED_HOSTS.append('127.0.0.1')

# Put your database config here
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Install CORS headers application
INSTALLED_APPS.append('corsheaders')

# Setup CORS middleware
MIDDLEWARE.append('corsheaders.middleware.CorsMiddleware')
MIDDLEWARE.append('django.middleware.common.CommonMiddleware')

DJANGO_SETTINGS_MODULE = 'powercor_dashboard.local_settings'

# Allow all CORS requests (this is development copy, so, everything is ok)
CORS_ORIGIN_ALLOW_ALL = True
