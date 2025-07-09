import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [seccion, setSeccion] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  // Cargar usuarios y ofertas desde localStorage al iniciar
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const ofertasGuardadas = JSON.parse(localStorage.getItem("ofertas")) || [];
    setUsuarios(usuariosGuardados);
    setOfertas(ofertasGuardadas);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("ofertas", JSON.stringify(ofertas));
  }, [ofertas]);

  const eliminarUsuario = (id) => {
    const filtrados = usuarios.filter((u) => u.id !== id);
    setUsuarios(filtrados);
  };

  const eliminarOferta = (id) => {
    const filtradas = ofertas.filter((o) => o.id !== id);
    setOfertas(filtradas);
  };

  const crearUsuario = () => {
    const nuevoUsuario = {
      id: Date.now(),
      nombre: "Nuevo Usuario",
      correo: "nuevo@correo.com",
      rol: "Usuario",
    };
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  const subirOferta = () => {
    const nuevaOferta = {
      id: Date.now(),
      titulo: "Nueva Oferta",
      empresa: "Empresa X",
    };
    setOfertas([...ofertas, nuevaOferta]);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Menú lateral */}
      <aside className="w-64 bg-white shadow-md px-6 py-8 space-y-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-6">Panel Admin</h2>
          <nav className="space-y-2">
            <button className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${seccion === "usuarios" && "bg-blue-200 font-semibold"}`} onClick={() => setSeccion("usuarios")}>Gestionar Usuarios</button>
            <button className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${seccion === "roles" && "bg-blue-200 font-semibold"}`} onClick={() => setSeccion("roles")}>Asignar Roles</button>
            <button className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${seccion === "ofertas" && "bg-blue-200 font-semibold"}`} onClick={() => setSeccion("ofertas")}>Ofertas de Empleo</button>
            <button className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${seccion === "postulaciones" && "bg-blue-200 font-semibold"}`} onClick={() => setSeccion("postulaciones")}>Postulaciones</button>
            <button className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${seccion === "perfiles" && "bg-blue-200 font-semibold"}`} onClick={() => setSeccion("perfiles")}>Perfiles Completos</button>
          </nav>
        </div>
        <button
          onClick={cerrarSesion}
          className="mt-10 w-full text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-8">
        {seccion === "usuarios" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Usuarios Registrados</h3>
            <table className="w-full table-auto bg-white rounded shadow overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">No hay usuarios registrados</td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="text-center border-b">
                      <td className="px-4 py-2">{u.nombre}</td>
                      <td className="px-4 py-2">{u.correo}</td>
                      <td className="px-4 py-2">{u.rol}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                        <button onClick={() => eliminarUsuario(u.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <button onClick={crearUsuario} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Crear nuevo usuario</button>
          </div>
        )}

        {seccion === "roles" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Asignar Roles</h3>
            <p className="text-gray-600">Funcionalidad para asignar o cambiar roles a usuarios.</p>
          </div>
        )}

        {seccion === "ofertas" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Ofertas de Trabajo</h3>
            <ul className="space-y-2">
              {ofertas.map((oferta) => (
                <li key={oferta.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{oferta.titulo}</h4>
                    <p className="text-sm text-gray-600">Empresa: {oferta.empresa}</p>
                  </div>
                  <button onClick={() => eliminarOferta(oferta.id)} className="text-sm bg-red-600 text-white px-3 py-1 rounded">Eliminar</button>
                </li>
              ))}
            </ul>
            <button onClick={subirOferta} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Subir nueva oferta</button>
          </div>
        )}

        {seccion === "postulaciones" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Postulaciones</h3>
            <p className="text-gray-600">Aquí podrás ver el historial de postulaciones de los usuarios.</p>
          </div>
        )}

        {seccion === "perfiles" && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Perfiles de Usuarios</h3>
            <p className="text-gray-600">Accede y edita los perfiles completos de cada usuario registrado.</p>
          </div>
        )}
      </main>
    </div>
  );
}
