import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "", // Cambiado de 'middleName' a 'middle_name'
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    role: "cliente", // Añadido el campo 'role' con un valor por defecto
    password: "",
    password_confirm: "", // Añadido el campo para confirmar contraseña
  });

  const [message, setMessage] = useState(''); // Añadido para mensajes de éxito
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpiar mensajes previos
    setError('');

    // Validaciones básicas en el frontend (más completas ahora)
    const {
      first_name,
      last_name,
      email,
      phone,
      country,
      city,
      address, // Ahora también obligatorio en el backend por extra_kwargs
      role, // Ahora también obligatorio
      password,
      password_confirm,
    } = formData;

    // Verificar campos obligatorios. Asegúrate de que coincidan con extra_kwargs en el serializer
    if (!first_name || !last_name || !email || !phone || !country || !city || !address || !role || !password || !password_confirm) {
        setError("Por favor completa todos los campos obligatorios.");
        return;
    }

    if (password !== password_confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }


    try {
      const response = await fetch("http://localhost:8000/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Siempre parsear la respuesta para ver detalles

      if (response.ok) {
        setMessage(data.message || "Registro exitoso!"); // Usar el mensaje del backend
        setError(""); // Limpiar errores
        // Resetear el formulario
        setFormData({
            first_name: "", middle_name: "", last_name: "", second_last_name: "",
            email: "", phone: "", country: "", city: "", address: "",
            role: "cliente", password: "", password_confirm: "",
        });
      } else {
        // Manejo de errores detallado del backend
        // data puede ser un objeto con errores por campo
        if (typeof data === 'object' && data !== null) {
            let errorMessages = [];
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    errorMessages.push(`${key}: ${data[key].join(', ')}`);
                } else {
                    errorMessages.push(`${key}: ${data[key]}`);
                }
            }
            setError("Error al registrar: " + errorMessages.join('; '));
        } else {
            setError("Error al registrar: " + (data.error || JSON.stringify(data)));
        }
        setMessage(""); // Limpiar mensaje de éxito
      }
    } catch (err) {
      setError("Error de red o del servidor. Inténtelo de nuevo.");
      setMessage("");
      console.error("Error al registrar:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-extrabold text-center text-blue-700 mb-2">
          Registro de Usuario
        </h1>
        <p className="text-center text-gray-600 mb-6 font-medium">
          Completa los siguientes campos
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="Primer nombre*"
              value={formData.first_name}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="middle_name" // Cambiado de 'middleName' a 'middle_name'
              placeholder="Segundo nombre"
              value={formData.middle_name}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Primer apellido*"
              value={formData.last_name}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="second_last_name"
              placeholder="Segundo apellido"
              value={formData.second_last_name}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico*"
              value={formData.email}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="tel" // Cambiado a 'tel' para números de teléfono
              name="phone"
              placeholder="Número de teléfono*"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="country"
              placeholder="País*"
              value={formData.country}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="city"
              placeholder="Ciudad*"
              value={formData.city}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección*" // Marcar como obligatorio en el frontend si es obligatorio en el backend
              value={formData.address}
              onChange={handleChange}
              className="input-style col-span-full"
            />
            {/* Selector de Rol */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-style col-span-full" // Ajusta el estilo según Tailwind
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder="Contraseña*"
              value={formData.password}
              onChange={handleChange}
              className="input-style col-span-full"
            />
            <input
              type="password"
              name="password_confirm" // Nuevo campo para confirmar contraseña
              placeholder="Confirmar Contraseña*"
              value={formData.password_confirm}
              onChange={handleChange}
              className="input-style col-span-full"
            />
          </div>

          {message && <p className="text-green-600 text-sm font-medium mt-2">{message}</p>} {/* Mensaje de éxito */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Mensaje de error */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
          >
            Registrarse
          </button>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-blue-600 hover:underline font-medium"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}