from django.http import JsonResponse

class RoleBasedAccessMiddleware:
    """
    Middleware que verifica el rol del usuario para proteger rutas específicas.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Define rutas protegidas y roles permitidos para cada una
        protected_paths = {
            '/api/admin/': ['admin'],
            '/api/editor/': ['admin', 'editor'],
        }

        path = request.path

        # Solo verificar si el usuario está autenticado
        if request.user.is_authenticated:
            for prefix, allowed_roles in protected_paths.items():
                if path.startswith(prefix):
                    user_role = getattr(request.user, 'role', None)
                    if user_role not in allowed_roles:
                        return JsonResponse({
                            'error': 'Acceso denegado. No tienes permiso para acceder a esta ruta.',
                            'required_roles': allowed_roles,
                            'your_role': user_role
                        }, status=403)

        response = self.get_response(request)
        return response
