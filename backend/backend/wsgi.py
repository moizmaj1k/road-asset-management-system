"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
GDAL_LIBRARY_PATH = os.path.join("C:\\OSGeo4W", "bin", "gdal309.dll")
GEOS_LIBRARY_PATH = os.path.join("C:\\OSGeo4W", "bin", "geos_c.dll") 

# Continue with Django setup
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

