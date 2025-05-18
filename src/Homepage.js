// HomePage.jsx
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-gray-800">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Mega Empleos</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Ofertas
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Empresas
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Blog
          </a>
          <a
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </a>
        </nav>
      </header>

      <main className="text-center mt-20 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Encuentra el trabajo de tus sueños
        </h2>
        <p className="text-white mb-8 text-lg">
          Conecta con miles de empresas y oportunidades laborales en tu área.
        </p>

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="¿Qué empleo buscas?"
            className="flex-1 border rounded-md px-4 py-2"
          />
          <input
            type="text"
            placeholder="Ubicación"
            className="flex-1 border rounded-md px-4 py-2"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
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
