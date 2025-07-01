import logging
from rest_framework import serializers
from ..models import Usuario

security_logger = logging.getLogger('security_logger')

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8,
                                     error_messages={
                                         'required': 'La contraseña es obligatoria.',
                                         'min_length': 'La contraseña debe tener al menos 8 caracteres.'
                                     })
    password_confirm = serializers.CharField(write_only=True, required=False, min_length=8,
                                             error_messages={
                                                 'min_length': 'La confirmación de la contraseña debe tener al menos 8 caracteres.'
                                             })

    class Meta:
        model = Usuario
        fields = [
            'id', 'first_name', 'middle_name', 'last_name', 'second_last_name',
            'email', 'phone', 'country', 'city', 'address', 'role',
            'password', 'password_confirm',
            'is_active', 'is_staff', 'is_locked', 'locked_until'
        ]
        read_only_fields = ['is_active', 'is_staff', 'is_locked', 'locked_until']
        extra_kwargs = {
            'first_name': {'required': True, 'error_messages': {'required': 'El nombre es obligatorio.'}},
            'last_name': {'required': True, 'error_messages': {'required': 'El apellido es obligatorio.'}},
            'email': {'required': True, 'error_messages': {'required': 'El email es obligatorio.'}},
            'phone': {'required': True, 'error_messages': {'required': 'El teléfono es obligatorio.'}},
            'country': {'required': True, 'error_messages': {'required': 'El país es obligatorio.'}},
            'city': {'required': True, 'error_messages': {'required': 'La ciudad es obligatoria.'}},
            'address': {'required': True, 'error_messages': {'required': 'La dirección es obligatoria.'}},
            'role': {'required': True, 'error_messages': {'required': 'El rol es obligatorio.'}},
        }

    def validate_email(self, value):
        if self.instance and self.instance.email == value:
            return value
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado.")
        return value

    def validate(self, data):
        if self.instance is None or 'password' in data:
            password = data.get('password')
            password_confirm = data.get('password_confirm')

            if self.instance is None and (not password or not password_confirm):
                errors = {}
                if not password:
                    errors['password'] = "La contraseña es obligatoria para el registro."
                if not password_confirm:
                    errors['password_confirm'] = "La confirmación de contraseña es obligatoria para el registro."
                if errors:
                    raise serializers.ValidationError(errors)

            if password and password_confirm and password != password_confirm:
                raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."})

            if self.instance and ((password and not password_confirm) or (not password and password_confirm)):
                raise serializers.ValidationError({"password": "Si vas a cambiar la contraseña, debes enviar ambos campos: 'password' y 'password_confirm'."})

        first_name = data.get('first_name', self.instance.first_name if self.instance else '')
        if 'juan' in first_name.lower():
            raise serializers.ValidationError({"first_name": "No se permiten usuarios llamados Juan."})

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password_confirm', None)

        usuario = Usuario.objects.create_user(email=validated_data['email'], password=password, **validated_data)
        security_logger.info(f"Usuario creado: {validated_data['email']}")
        return usuario

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            security_logger.info(f"Cambio de contraseña para usuario: {instance.email}")
            instance.set_password(password)
        validated_data.pop('password_confirm', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        security_logger.info(f"Perfil de usuario actualizado: {instance.email}")
        return instance