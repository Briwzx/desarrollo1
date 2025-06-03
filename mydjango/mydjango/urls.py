from django.contrib import admin
from django.urls import path
from .views import registrar_usuario, login_usuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/registro/', registrar_usuario, name='registro_usuario'),
    path('api/login/', login_usuario, name='login_usuario'),
]
