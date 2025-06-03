from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers.usuario_serializer import UsuarioSerializer
from django.contrib.auth.hashers import check_password
import requests
from django.conf import settings

@api_view(['POST'])
def registrar_usuario(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuario registrado correctamente"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_usuario(request):
    email = request.data.get('email')
    password = request.data.get('password')
    captcha_token = request.data.get('captchaToken')

    # Validar que venga el token
    if not captcha_token:
        return Response({'error': 'Falta la verificación del CAPTCHA'}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar CAPTCHA con Google
    captcha_response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': settings.RECAPTCHA_SECRET_KEY,
            'response': captcha_token
        }
    )
    result = captcha_response.json()
    if not result.get('success'):
        return Response({'error': 'Verificación de CAPTCHA fallida'}, status=status.HTTP_400_BAD_REQUEST)

    # Continuar con autenticación
    if not email or not password:
        return Response({'error': 'Email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(email=email)
        if usuario.password == password:
            return Response({'message': 'Login exitoso', 'email': usuario.email}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)