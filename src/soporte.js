import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Soporte() {
  const navigate = useNavigate();
  const [problema, setProblema] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagenes(previews);
  };

  const handleEnviar = () => {
    console.log("Tipo de problema:", problema);
    console.log("Descripción:", descripcion);
    console.log("Imágenes:", imagenes.length);

    // Aquí podrías enviar los datos a tu backend

    alert("¡Tu reporte fue enviado con éxito!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Centro de Soporte</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">¿Qué tipo de problema tienes?</label>
          <select
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="">Selecciona una opción</option>
            <option value="error">Error en la plataforma</option>
            <option value="cuenta">Problemas con mi cuenta</option>
            <option value="publicidad">Publicidad engañosa</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Describe el problema</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="w-full border rounded-md px-4 py-2"
            placeholder="Incluye todos los detalles posibles..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Subir imágenes como evidencia (opcional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagenChange}
            className="w-full"
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {imagenes.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`evidencia-${idx}`}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleEnviar}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Enviar reporte
          </button>
        </div>
      </div>
    </div>
  );
}
