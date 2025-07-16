from django.contrib import admin
from .models import Usuario, FailedLoginAttempt, Postulacion
from .models import OfertaLaboral

@admin.register(FailedLoginAttempt)
class FailedLoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('username', 'ip_address', 'attempt_time', 'reason')
    readonly_fields = ('username', 'ip_address', 'user_agent', 'attempt_time', 'reason')
    ordering = ('-attempt_time',)
    search_fields = ('username', 'ip_address')


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff', 'is_locked')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('role', 'is_active', 'is_staff', 'is_locked')
    ordering = ('email',)
    readonly_fields = ('locked_until',)


@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'oferta', 'fecha_postulacion', 'estado')
    search_fields = ('usuario__email', 'titulo_oferta')
    list_filter = ('estado', 'fecha_postulacion')
    ordering = ('-fecha_postulacion',)


@admin.register(OfertaLaboral)
class OfertaLaboralAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo_cargo', 'rango', 'fecha_inicio', 'fecha_fin', 'salario')
    search_fields = ('titulo', 'tipo_cargo')
    list_filter = ('tipo_cargo', 'rango', 'fecha_inicio')

