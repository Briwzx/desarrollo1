import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    secondLastName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      password,
    } = formData;

    if (!firstName || !lastName || !email || !phone || !country || !city || !password) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    setError("");
    alert("Registro exitoso");
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
              name="firstName"
              placeholder="Primer nombre*"
              value={formData.firstName}
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
              name="lastName"
              placeholder="Primer apellido*"
              value={formData.lastName}
              onChange={handleChange}
              className="input-style"
            />
            <input
              type="text"
              name="secondLastName"
              placeholder="Segundo apellido"
              value={formData.secondLastName}
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
