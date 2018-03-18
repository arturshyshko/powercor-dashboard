from .settings import *

# Turn on production mode on Heroku
DEBUG = False if os.environ.get("DEBUG") == "False" else True

# Reference to Heroku database
DATABASES['default'] = dj_database_url.parse(os.environ.get("DATABASE_URL"))

SECURE_SSL_REDIRECT = True
