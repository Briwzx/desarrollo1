from .models import FailedLoginAttempt
from django.contrib import admin

@admin.register(FailedLoginAttempt)
class FailedLoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('username', 'ip_address', 'attempt_time', 'reason')
    readonly_fields = ('username', 'ip_address', 'user_agent', 'attempt_time', 'reason')
    ordering = ('-attempt_time',)
    search_fields = ('username', 'ip_address')
