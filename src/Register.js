import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    middleName: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    city,
    password,
  } = formData;

  if (!first_name || !last_name || !email || !phone || !country || !city || !password) {
    setError("Por favor completa los campos obligatorios.");
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

    if (response.ok) {
      alert("Registro exitoso");
      setFormData({
        first_name: "",
        middleName: "",
        last_name: "",
        second_last_name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        password: "",
      });
    } else {
      const data = await response.json();
      setError("Error al registrar: " + JSON.stringify(data));
    }
  } catch (err) {
    setError("Error de red o del servidor.");
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
              name="middleName"
              placeholder="Segundo nombre"
              value={formData.middleName}
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
              type="tel"
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
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              className="input-style col-span-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña*"
              value={formData.password}
              onChange={handleChange}
              className="input-style col-span-full"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
