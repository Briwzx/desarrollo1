import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ciudadesColombia = [
  "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira",
  "Santa Marta", "Ibagué", "Villavicencio", "Manizales", "Pasto", "Montería", "Neiva", "Soacha",
  "Armenia", "Sincelejo", "Popayán", "Valledupar", "Buenaventura", "Palmira", "Floridablanca",
  "Riohacha", "Tuluá", "Dosquebradas", "Tunja", "Girardot", "Quibdó", "Yopal", "Apartadó",
  "Florencia", "Turbo", "Maicao", "Sogamoso", "Facatativá", "Zipaquirá", "Fusagasugá", "Chía",
  "Jamundí", "Ipiales", "Magangué", "Ciénaga", "Buga", "Itagüí", "Envigado", "Rionegro",
  "Sabaneta", "Mosquera", "Cajicá", "La Dorada", "Malambo", "Madrid", "Piedecuesta", "Girón",
  "Caldas", "Chigorodó", "El Carmen de Bolívar", "Lorica", "Cereté", "San Andrés",
];

export default function HomePage() {
  const [mostrarOfertas, setMostrarOfertas] = useState(false);
  const [mostrarEmpresas, setMostrarEmpresas] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const ofertasRef = useRef(null);
  const empresasRef = useRef(null);
  const perfilRef = useRef(null);
  const [ubicacion, setUbicacion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [curriculum, setCurriculum] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const perfil = {
    nombre: "Admin",
    correo: "admin@correo.com",
    telefono: "+57 300 123 4567",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ofertasRef.current && !ofertasRef.current.contains(event.target)) {
        setMostrarOfertas(false);
      }
      if (empresasRef.current && !empresasRef.current.contains(event.target)) {
        setMostrarEmpresas(false);
      }
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setMostrarPerfil(false);
      }
    }
    if (mostrarOfertas || mostrarEmpresas || mostrarPerfil) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarOfertas, mostrarEmpresas, mostrarPerfil]);

  const ofertasNuevas = [
    {
      titulo: "Desarrollador Frontend React",
      empresa: "Tech Solutions",
      ubicacion: "Remoto",
    },
    {
      titulo: "Diseñador UX/UI",
      empresa: "Creativa Studio",
      ubicacion: "CDMX",
    },
    {
      titulo: "Analista de Datos",
      empresa: "DataCorp",
      ubicacion: "Guadalajara",
    },
  ];

  const empresasEnviadas = [
    { nombre: "Tech Solutions", fecha: "2025-07-01" },
    { nombre: "Creativa Studio", fecha: "2025-07-03" },
    { nombre: "DataCorp", fecha: "2025-07-05" },
  ];

  const handleCurriculumChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurriculum(e.target.files[0]);
    }
  };

  const handleImagenPerfilChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (ev) {
        setImagenPerfil(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-gray-800">
      <header className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center relative gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Mega Empleos</h1>
        <nav className="flex flex-wrap gap-2 items-center">
          {/* Botón Ofertas */}
          <div className="relative inline-block" ref={ofertasRef}>
            <button
              onClick={() => {
                setMostrarOfertas((prev) => !prev);
                setMostrarEmpresas(false);
                setMostrarPerfil(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
            >
              Ofertas
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full align-top">
                {ofertasNuevas.length}
              </span>
            </button>
            {mostrarOfertas && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
                <div className="p-4 border-b font-bold text-blue-700">Ofertas Nuevas</div>
                <ul>
                  {ofertasNuevas.map((oferta, idx) => (
                    <li key={idx} className="px-4 py-3 hover:bg-blue-50 border-b last:border-b-0">
                      <div className="font-semibold">{oferta.titulo}</div>
                      <div className="text-sm text-gray-600">{oferta.empresa} — {oferta.ubicacion}</div>
                    </li>
                  ))}
                </ul>
                <div className="text-center p-2">
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Ver todas las ofertas
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Botón Empresas */}
          <div className="relative inline-block" ref={empresasRef}>
            <button
              onClick={() => {
                setMostrarEmpresas((prev) => !prev);
                setMostrarOfertas(false);
                setMostrarPerfil(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
            >
              Empresas
              <span className="ml-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full align-top">
                {empresasEnviadas.length}
              </span>
            </button>
            {mostrarEmpresas && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
                <div className="p-4 border-b font-bold text-blue-700">
                  Empresas con CV enviado
                </div>
                <ul>
                  {empresasEnviadas.map((empresa, idx) => (
                    <li key={idx} className="px-4 py-3 hover:bg-blue-50 border-b last:border-b-0">
                      <div className="font-semibold">{empresa.nombre}</div>
                      <div className="text-sm text-gray-600">Enviado: {empresa.fecha}</div>
                    </li>
                  ))}
                </ul>
                <div className="text-center p-2">
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Ver historial de envíos
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Perfil */}
          <div className="relative inline-block" ref={perfilRef}>
            <button
              onClick={() => {
                setMostrarPerfil((prev) => !prev);
                setMostrarOfertas(false);
                setMostrarEmpresas(false);
              }}
              className="flex items-center gap-2 focus:outline-none"
            >
              {imagenPerfil ? (
                <img
                  src={imagenPerfil}
                  alt="Perfil"
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-600"
                />
              ) : (
                <span className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {perfil.nombre[0]}
                </span>
              )}
              <span className="font-medium text-gray-700">{perfil.nombre}</span>
            </button>
            {mostrarPerfil && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-30 border border-gray-200">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3 mb-2">
                    {imagenPerfil ? (
                      <img
                        src={imagenPerfil}
                        alt="Perfil"
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                      />
                    ) : (
                      <span className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                        {perfil.nombre[0]}
                      </span>
                    )}
                    <div>
                      <div className="font-bold text-lg">{perfil.nombre}</div>
                      <div className="text-sm text-gray-600">{perfil.correo}</div>
                      <div className="text-sm text-gray-600">{perfil.telefono}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cambiar imagen de perfil
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImagenPerfilChange}
                      className="block w-full text-sm text-gray-600"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subir currículum
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCurriculumChange}
                      className="block w-full text-sm text-gray-600"
                    />
                    {curriculum && (
                      <div className="text-xs text-green-600 mt-1">
                        Archivo seleccionado: {curriculum.name}
                      </div>
                    )}
                  </div>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/editarperfil"
                      className="block w-full text-left px-6 py-2 hover:bg-blue-50 text-gray-700"
                    >
                      Editar perfil
                    </Link>
                  </li>
                  <li>
                    <button className="w-full text-left px-6 py-2 hover:bg-blue-50 text-gray-700">
                      Ver solicitudes
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-6 py-2 hover:bg-blue-50 text-gray-700">
                      Soporte
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="text-center mt-20 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Encuentra el trabajo de tus sueños
        </h2>
        <p className="text-white mb-8 text-lg">
          Conecta con miles de empresas y oportunidades laborales en tu área.
        </p>

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-4 items-stretch">
          <input
            type="text"
            placeholder="¿Qué empleo buscas?"
            className="flex-1 border rounded-md px-4 py-2 min-w-[180px]"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <select
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 min-w-[180px]"
          >
            <option value="">Selecciona una ciudad o municipio</option>
            {ciudadesColombia.map((ciudad, idx) => (
              <option key={idx} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 min-w-[120px] transition"
            style={{ whiteSpace: "nowrap" }}
          >
            Buscar
          </button>
        </div>
      </main>

      <footer className="mt-20 text-center text-white text-sm py-6">
        © 2025 Mega Empleos — Todos los derechos reservados.
      </footer>
    </div>
  );
}
