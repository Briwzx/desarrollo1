import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditarPerfil() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("admin@correo.com");
  const [telefono, setTelefono] = useState("+57 300 123 4567");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [curriculum, setCurriculum] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleImagenChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagenPerfil(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCurriculumChange = (e) => {
    if (e.target.files[0]) {
      setCurriculum(e.target.files[0]);
    }
  };

  const handleGuardar = () => {
    if (nuevaPassword !== confirmarPassword) {
      setErrorPassword("Las contraseñas no coinciden");
      return;
    }

    setErrorPassword("");

    console.log("Correo:", correo);
    console.log("Teléfono 1:", telefono);
    console.log("Teléfono 2:", telefonoSecundario);
    console.log("CV:", curriculum);
    console.log("Nueva contraseña:", nuevaPassword ? nuevaPassword : "(sin cambios)");

    // Aquí podrías enviar los datos al backend

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Editar Perfil</h2>

        {/* Correo */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Número de teléfono principal</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Teléfono secundario */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Número de teléfono adicional</label>
          <input
            type="text"
            value={telefonoSecundario}
            onChange={(e) => setTelefonoSecundario(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Imagen de perfil */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Foto de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="w-full"
          />
          {imagenPerfil && (
            <img src={imagenPerfil} alt="Preview" className="w-24 h-24 mt-2 rounded-full object-cover border" />
          )}
        </div>

        {/* Currículum */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Currículum</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCurriculumChange}
            className="w-full"
          />
          {curriculum && (
            <div className="text-xs text-green-600 mt-1">
              Archivo seleccionado: {curriculum.name}
            </div>
          )}
        </div>

        {/* Cambiar contraseña */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Cambiar contraseña</h3>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Contraseña actual</label>
            <input
              type="password"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            />
            {errorPassword && (
              <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
