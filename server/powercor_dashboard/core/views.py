from django.apps import apps

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def models_viewset(request):
    """
    API endpoint to get object which is used as base for client app
    It's keys are names of all models of dashboard app
    Their values are just empty arrays
    """
    result = {}

    app_models = apps.get_app_config('dashboard').get_models()
    for model in app_models:
        name = model.__name__
        # Camelize model name
        name = name[:1].lower() + name[1:]

        result[name] = []

    return Response(result)
