from rest_framework.authtoken.models import Token
from django.http import HttpResponseForbidden
from .models import User


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split('Token')[1].strip()
        # print("{color}TOKEN: {token}".format(
        #     color='\033[96m', token=token))
        try:
            req_token = Token.objects.get(key=token)
            try:
                user = User.objects.get(id=req_token.user.id)
                # print("{color}USER: {user} {black}".format(
                #     color='\033[96m', black='\33[37m', user=user))
                request.user = user
                return self.get_response(request)
            except User.DoesNotExist:
                return HttpResponseForbidden('Not authorized')
        except Token.DoesNotExist:
            return HttpResponseForbidden('Invalid Token')
