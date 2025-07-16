from rest_framework import serializers
from ..models import Postulacion

class PostulacionSerializer(serializers.ModelSerializer):
    usuario_email = serializers.ReadOnlyField(source='usuario.email') # Muestra el email del usuario

    class Meta:
        model = Postulacion
        fields = '__all__' # Incluye todos los campos del modelo Postulacion
        read_only_fields = ['id', 'usuario', 'fecha_postulacion'] # Estos campos se generan automáticamente o por el backend