import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // No hay BrowserRouter aquí

import Login from './Login';
import Register from './Register';
import HomePage from './Homepage';
import MisPostulaciones from './components/MisPostulaciones';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    // ¡Aquí ya NO hay un <Router> envolviendo!
    <div className="App">
      <nav style={{ padding: '10px', background: '#f0f0f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to="/register" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Registrar</Link>
        <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
        {localStorage.getItem('token') && (
          <Link to="/mis-postulaciones" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Mis Postulaciones</Link>
        )}
        {localStorage.getItem('token') && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Cerrar Sesión
          </button>
        )}
      </nav>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mis-postulaciones" element={<MisPostulaciones />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;