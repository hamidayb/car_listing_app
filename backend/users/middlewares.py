from rest_framework.authtoken.models import Token
from django.http import HttpResponseForbidden, HttpResponse
from django.urls import reverse, resolve
from .models import User

from django.contrib.auth.hashers import make_password

url_names = ['loginview', 'registerview']


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(make_password('1234'))
        req_url = resolve(request.path_info)
        if (req_url.url_name not in url_names) and (not req_url.route.startswith('admin')):
            token = request.META['HTTP_AUTHORIZATION'].split('Token')[
                1].strip()
            try:
                req_token = Token.objects.get(key=token)
                try:
                    user = User.objects.get(id=req_token.user.id)
                    request.user = user
                    return self.get_response(request)
                except User.DoesNotExist:
                    return HttpResponseForbidden('Not authorized')
            except Token.DoesNotExist:
                return HttpResponseForbidden('Invalid Token')
        else:
            return self.get_response(request)
