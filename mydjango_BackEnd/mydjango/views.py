from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, FailedLoginAttempt
from .serializers.usuario_serializer import UsuarioSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from django.utils import timezone
from datetime import timedelta
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Postulacion 
from .serializers.postulacion_serializer import PostulacionSerializer 
from rest_framework.generics import (
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    DestroyAPIView 
)

# --- CONFIGURACIÓN DE BLOQUEO ---
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_TIME_MINUTES = 30
ATTEMPT_WINDOW_MINUTES = 15

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

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
    ip_address = get_client_ip(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    now = timezone.now()

    if email:
        try:
            usuario = Usuario.objects.get(email=email)
            if usuario.is_locked:
                if usuario.locked_until and usuario.locked_until > now:
                    remaining_time_seconds = int((usuario.locked_until - now).total_seconds())
                    minutes = remaining_time_seconds // 60
                    seconds = remaining_time_seconds % 60
                    return Response(
                        {'error': f'La cuenta está bloqueada. Inténtelo de nuevo en {minutes} minutos y {seconds} segundos.'},
                        status=status.HTTP_403_FORBIDDEN
                    )
                else:
                    usuario.is_locked = False
                    usuario.locked_until = None
                    usuario.save()
        except Usuario.DoesNotExist:
            pass

    if not email or not password:
        FailedLoginAttempt.objects.create(
            username=email if email else 'N/A',
            ip_address=ip_address,
            user_agent=user_agent,
            reason="Credenciales incompletas"
        )
        return Response({'error': 'Email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(email=email)
        if check_password(password, usuario.password):
            FailedLoginAttempt.objects.filter(username=email).delete()
            return Response({'message': 'Login exitoso', 'email': usuario.email}, status=status.HTTP_200_OK)
        else:
            FailedLoginAttempt.objects.create(
                username=email,
                ip_address=ip_address,
                user_agent=user_agent,
                reason="Contraseña incorrecta"
            )
            check_for_lockout(email, ip_address, request)
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        FailedLoginAttempt.objects.create(
            username=email,
            ip_address=ip_address,
            user_agent=user_agent,
            reason="Usuario no encontrado"
        )
        check_for_lockout(email, ip_address, request, is_user_non_existent=True)
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

def check_for_lockout(email, ip_address, request, is_user_non_existent=False):
    now = timezone.now()
    time_window_start = now - timedelta(minutes=ATTEMPT_WINDOW_MINUTES)

    if email and not is_user_non_existent:
        failed_attempts_user = FailedLoginAttempt.objects.filter(
            username=email,
            attempt_time__gte=time_window_start
        ).count()

        if failed_attempts_user >= MAX_FAILED_ATTEMPTS:
            try:
                usuario = Usuario.objects.get(email=email)
                if not usuario.is_locked:
                    usuario.is_locked = True
                    usuario.locked_until = now + timedelta(minutes=LOCKOUT_TIME_MINUTES)
                    usuario.save()
                    FailedLoginAttempt.objects.create(
                        username=email,
                        ip_address=ip_address,
                        user_agent=request.META.get('HTTP_USER_AGENT', ''),
                        reason=f"Cuenta bloqueada por {MAX_FAILED_ATTEMPTS} intentos fallidos (email)"
                    )
            except Usuario.DoesNotExist:
                pass

class VistaAdmin(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'mensaje': 'Hola Admin!'})

class VistaEditor(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'mensaje': 'Hola Editor!'})

class UsuarioDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'email'
    permission_classes = [IsAuthenticated]

class MisPostulacionesAPIView(ListAPIView):
    serializer_class = PostulacionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
         return Postulacion.objects.filter(usuario=self.request.user).order_by('-fecha_postulacion')

class PostulacionDeleteAPIView(DestroyAPIView):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer 
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

    def get_queryset(self):
        return Postulacion.objects.filter(usuario=self.request.user)

class PostulacionRetrieveUpdateAPIView(RetrieveUpdateAPIView): 
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 
    
    def get_queryset(self):
                return Postulacion.objects.filter(usuario=self.request.user)