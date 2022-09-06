from rest_framework.authtoken.models import Token
from django.http import HttpResponseForbidden, HttpResponse
from django.urls import resolve
from .models import User
from termcolor import colored


url_names = ['login_api', 'register_api', 'all_ads_api', 'ad_api']


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        req_url = resolve(request.path_info)
        print(req_url.route)
        if (req_url.url_name not in url_names) and (not req_url.route.startswith('admin')) and (not req_url.route.startswith('^media')):
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
