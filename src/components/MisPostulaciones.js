import React, { useState, useEffect } from 'react';

function MisPostulaciones() {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [editingPostulacion, setEditingPostulacion] = useState(null);

  useEffect(() => {
    const fetchPostulaciones = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No autenticado. Por favor, inicie sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/mis-postulaciones/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPostulaciones(data);
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Error al cargar las postulaciones.');
        }
      } catch (err) {
        setError('Error de red o del servidor al cargar postulaciones.');
        console.error('Error al cargar postulaciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostulaciones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta postulación?')) {
      setDeletingId(id);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No autenticado. Por favor, inicie sesión para eliminar.');
        setDeletingId(null);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/postulaciones/${id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status === 204) {
          setPostulaciones(postulaciones.filter(post => post.id !== id));
          alert('Postulación eliminada exitosamente.');
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Error al eliminar la postulación.');
        }
      } catch (err) {
        setError('Error de red o del servidor al eliminar la postulación.');
        console.error('Error al eliminar postulación:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (postulacion) => {
    setEditingPostulacion({ ...postulacion });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPostulacion(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editingPostulacion) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicie sesión.');
      return;
    }

    const payload = {
        titulo_oferta: editingPostulacion.titulo_oferta,
        estado: editingPostulacion.estado,
        fecha_postulacion: editingPostulacion.fecha_postulacion,
        usuario: editingPostulacion.usuario,
        oferta_empleo: editingPostulacion.oferta_empleo
    };

    try {
      const response = await fetch(`http://localhost:8000/api/postulaciones/${editingPostulacion.id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedPostulacion = await response.json();
        setPostulaciones(prev => prev.map(post =>
          post.id === updatedPostulacion.id ? updatedPostulacion : post
        ));
        setEditingPostulacion(null);
        alert('Postulación actualizada exitosamente.');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || errorData.error || 'Error al actualizar la postulación.');
        console.error('Error al actualizar postulacion:', errorData);
      }
    } catch (err) {
      setError('Error de red o del servidor al actualizar la postulación.');
      console.error('Error al actualizar postulación:', err);
    }
  };


  if (loading) {
    return <p>Cargando postulaciones...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Mis Postulaciones</h2>

      {editingPostulacion && (
        <div style={{ border: '2px solid #007bff', padding: '20px', margin: '20px 0', borderRadius: '8px', backgroundColor: '#e6f7ff' }}>
          <h3>Editar Postulación (ID: {editingPostulacion.id})</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="edit_titulo_oferta" style={{ display: 'block', marginBottom: '5px' }}>Título de la Oferta:</label>
              <input
                type="text"
                id="edit_titulo_oferta"
                name="titulo_oferta"
                value={editingPostulacion.titulo_oferta || ''}
                onChange={handleEditChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="edit_estado" style={{ display: 'block', marginBottom: '5px' }}>Estado:</label>
              <select
                id="edit_estado"
                name="estado"
                value={editingPostulacion.estado || ''}
                onChange={handleEditChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="pendiente">Pendiente</option>
                <option value="revision">En Revisión</option>
                <option value="aceptada">Aceptada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditingPostulacion(null)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {postulaciones.length === 0 ? (
        <p>No tienes postulaciones aún.</p>
      ) : (
        <ul>
          {postulaciones.map((postulacion) => (
            <li key={postulacion.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{postulacion.titulo_oferta}</h3>
                <p>Estado: {postulacion.estado}</p>
                <p>Fecha de postulación: {new Date(postulacion.fecha_postulacion).toLocaleDateString()}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(postulacion)}
                  style={{
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(postulacion.id)}
                  disabled={deletingId === postulacion.id}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    opacity: deletingId === postulacion.id ? 0.7 : 1
                  }}
                >
                  {deletingId === postulacion.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisPostulaciones;