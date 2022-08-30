from rest_framework.authtoken.models import Token

from django.http import HttpResponseForbidden

from .models import User


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, pk):
        response = self.get_response(request)
        req_token = Token.objects.get(user=pk)
        token = request.META['HTTP_AUTHORIZATION'].split('Token')[1].strip()

        if(token == req_token.key):
            user = User.objects.get(id=pk)
            request = user
            return response
        else:
            return HttpResponseForbidden('Not authorized')
