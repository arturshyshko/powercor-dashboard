"""
Settings parsing setup for Chimplie Flow API server
"""

try:
    # Importing local settings
    from .local_settings import *
except ImportError:
    # Does not exist. Using default settings
    from .default_settings import *