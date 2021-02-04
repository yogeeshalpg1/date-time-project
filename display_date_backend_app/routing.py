from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter
from django.urls import path
from display_date.consumer import DateConsumer

websocket_urlpatterns = [
                            path('ws/display_date/',DateConsumer.as_asgi())
                        ]


application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})