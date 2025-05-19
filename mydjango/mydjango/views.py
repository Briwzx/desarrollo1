from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers.usuario_serializer import UsuarioSerializer

@api_view(['POST'])
def registrar_usuario(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuario registrado correctamente"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
