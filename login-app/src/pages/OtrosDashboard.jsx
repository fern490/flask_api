import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaClipboardList, FaEnvelope, FaCogs, FaSignOutAlt, FaRocket } from 'react-icons/fa';

const OtrosDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("servicios");
  const [servicios, setServicios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editandoServicio, setEditandoServicio] = useState(null);
  const [showCrearServicioForm, setShowCrearServicioForm] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre_servicio: '', descripcion: '', costo: '' });

  const proveedorId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000";

  const resetCrearServicio = () => {
    setNuevoServicio({ nombre_servicio: '', descripcion: '', costo: '' });
    setShowCrearServicioForm(false);
  };
  
  // ========================================================================
  // 1. FUNCIONES CRUD: Obtener, Crear, Editar, Eliminar
  // ========================================================================

  const fetchServicios = useCallback(async () => {
    if (!proveedorId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/servicios?proveedor_id=${proveedorId}`);
      if (!response.ok) throw new Error("Error al obtener servicios");
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setServicios([]);
    } finally {
      setIsLoading(false);
    }
  }, [proveedorId]);
  
  const handleCrearServicio = async (e) => {
    e.preventDefault();
    if (!nuevoServicio.nombre_servicio || !nuevoServicio.descripcion || !nuevoServicio.costo) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    
    const costoNumerico = parseFloat(nuevoServicio.costo);
    if (isNaN(costoNumerico) || costoNumerico <= 0) {
        alert("El costo debe ser un número positivo.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/servicios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...nuevoServicio,
                costo: costoNumerico,
                proveedor_id: proveedorId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error desconocido al crear el servicio");
        }

        alert("Servicio creado con éxito!");
        resetCrearServicio();
        fetchServicios();
    } catch (error) {
        console.error("Error al crear servicio:", error);
        alert(`Error al crear servicio: ${error.message}`);
    }
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditandoServicio({ ...editandoServicio, [name]: value });
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editandoServicio) return;

    try {
        const response = await fetch(`${BASE_URL}/api/servicios/${editandoServicio.servicio_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editandoServicio),
        });

        if (!response.ok) throw new Error("Error al editar el servicio");

        alert("Servicio actualizado con éxito!");
        setEditandoServicio(null);
        fetchServicios();
    } catch (error) {
        console.error("Error al editar servicio:", error);
        alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteServicio = async (servicioId) => {
  if (!window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) return;

  try {
      const response = await fetch(`${BASE_URL}/api/servicios/${servicioId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData); // Para verificar qué datos está devolviendo el backend

          // Mostrar un mensaje de error detallado
          if (response.status === 404) {
              alert("Servicio no encontrado. Por favor, actualiza la lista.");
          } else if (response.status === 409) {
              alert(errorData.message || "No se puede eliminar el servicio debido a dependencias.");
          } else {
              alert(`Error al eliminar el servicio: ${errorData.message || response.statusText}`);
          }

          throw new Error(errorData.message || `Error ${response.status}`);
      }

      alert("Servicio eliminado con éxito!");
      fetchServicios();
  } catch (error) {
      console.error("Error al eliminar servicio:", error);
      alert(`Error: ${error.message}`);
  }
};

  const fetchSolicitudes = () => {};
  const fetchMensajes = () => {};

  useEffect(() => {
    if (seccion === "servicios") fetchServicios();
    else if (seccion === "solicitudes") fetchSolicitudes();
    else if (seccion === "mensajes") fetchMensajes();
  }, [seccion, fetchServicios]);
  
  // ========================================================================
  // 2. COMPONENTE DE CREACIÓN DE SERVICIO (Renderizado Inline)
  // ========================================================================
  const CrearServicioForm = () => (
    <div style={styles.formContainer}>
        <h3>Nuevo Servicio</h3>
        <form onSubmit={handleCrearServicio} style={styles.form}>
            {/* Nombre */}
            <label style={styles.formLabel}>Nombre del Servicio:</label>
            <input 
                type="text" 
                name="nombre_servicio"
                value={nuevoServicio.nombre_servicio} 
                onChange={(e) => setNuevoServicio({...nuevoServicio, nombre_servicio: e.target.value})} 
                style={styles.formInput} 
                required 
            />

            {/* Costo */}
            <label style={styles.formLabel}>Costo (USD):</label>
            <input 
                type="number" 
                name="costo"
                value={nuevoServicio.costo} 
                onChange={(e) => setNuevoServicio({...nuevoServicio, costo: e.target.value})} 
                style={styles.formInput} 
                min="0.01"
                step="0.01"
                required 
            />
            
            {/* Descripción */}
            <label style={styles.formLabel}>Descripción:</label>
            <textarea 
                name="descripcion"
                value={nuevoServicio.descripcion} 
                onChange={(e) => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})} 
                style={styles.formTextarea} 
                rows="4" 
                required 
            />

            <div style={styles.formActions}>
                <button type="submit" style={styles.formButton}>
                    <FaPlus /> Guardar Servicio
                </button>
                <button 
                    type="button" 
                    onClick={resetCrearServicio} 
                    style={{...styles.formButton, backgroundColor: '#f44336'}} // Rojo para cancelar
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
  );


  // ========================================================================
  // 3. RENDERIZADO DE CONTENIDO PRINCIPAL
  // ========================================================================
  const renderContenido = () => {
    switch (seccion) {
      case "servicios":
        if (isLoading) return <p>Cargando servicios...</p>;

        // 💡 Muestra el formulario de creación si está activo
        if (showCrearServicioForm) {
            return CrearServicioForm();
        }

        return (
            <div>
                <h3>Gestión de Servicios</h3>
                <button 
                    onClick={() => setShowCrearServicioForm(true)} 
                    style={styles.crearButton}
                >
                    <FaPlus /> Crear Servicio
                </button>
                
                <div style={styles.serviciosGrid}>
                    {servicios.length > 0 ? (
                        servicios.map(servicio => (
                            <div key={servicio.servicio_id} style={styles.servicioCard}>
                                <h4>{servicio.nombre_servicio}</h4>
                                <p>{servicio.descripcion}</p>
                                <p><strong>Costo:</strong> ${parseFloat(servicio.costo).toFixed(2)}</p>
                                <div style={styles.servicioActions}>
                                    <button 
                                        onClick={() => setEditandoServicio(servicio)} 
                                        style={styles.editButton}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteServicio(servicio.servicio_id)} 
                                        style={styles.deleteButton}
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes servicios registrados.</p>
                    )}
                </div>

                {/* Modal/Formulario de Edición */}
                {editandoServicio && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.editModal}>
                            <h4>Editar Servicio</h4>
                            <form onSubmit={handleEditSubmit}>
                                <label style={styles.formLabel}>Nombre:</label>
                                <input 
                                    type="text" 
                                    name="nombre_servicio"
                                    value={editandoServicio.nombre_servicio} 
                                    onChange={handleEditChange} 
                                    style={styles.formInput} 
                                    required 
                                />
                                <label style={styles.formLabel}>Costo:</label>
                                <input 
                                    type="number" 
                                    name="costo"
                                    value={editandoServicio.costo} 
                                    onChange={handleEditChange} 
                                    style={styles.formInput} 
                                    required 
                                    min="0.01" 
                                    step="0.01"
                                />
                                <label style={styles.formLabel}>Descripción:</label>
                                <textarea 
                                    name="descripcion"
                                    value={editandoServicio.descripcion} 
                                    onChange={handleEditChange} 
                                    style={styles.formTextarea} 
                                    rows="4"
                                    required
                                />
                                <div style={styles.formActions}>
                                    <button type="submit" style={styles.formButton}>Guardar Cambios</button>
                                    <button 
                                        type="button" 
                                        onClick={() => setEditandoServicio(null)}
                                        style={{...styles.formButton, backgroundColor: '#555'}}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );

      case "solicitudes":
        return <h3>Solicitudes de Servicio (a implementar)</h3>;
      case "mensajes":
        return <h3>Mensajes (a implementar)</h3>;
      case "configuracion":
        return <h3>Configuración de Perfil (a implementar)</h3>;
      default:
        return <h3>Seleccione una sección</h3>;
    }
  };

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#2c2c2c',
      padding: '20px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '4px 0 10px rgba(0, 0, 0, 0.5)',
    },
    mainContent: {
      flexGrow: 1,
      padding: '30px',
      backgroundColor: '#1f1f1f',
      color: '#ffffff',
    },
    navSection: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    navButton: (active) => ({
      backgroundColor: active ? '#00bcd4' : 'transparent',
      color: active ? '#1a1a1a' : 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: active ? 'bold' : 'normal',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'background-color 0.3s, color 0.3s',
      ':hover': {
        backgroundColor: active ? '#0097a7' : '#3a3a3a',
        color: active ? '#1a1a1a' : '#ffffff',
      },
    }),
    navIcon: {
      fontSize: '18px',
    },
    logoutButton: {
      backgroundColor: '#f44336',
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: '#d32f2f',
      },
    },
    crearButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.3s',
        ':hover': {
          backgroundColor: '#388e3c',
        }
    },
    formContainer: {
        backgroundColor: '#2c2c2c',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        maxWidth: '600px',
        margin: '20px 0',
    },
    formLabel: {
        display: 'block',
        margin: '10px 0 5px',
        fontWeight: 'bold',
        color: '#ccc',
        fontSize: '14px',
    },
    formInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #555',
        backgroundColor: '#3a3a3a',
        color: 'white',
    },
    formTextarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #555',
        backgroundColor: '#3a3a3a',
        color: 'white',
        resize: 'vertical',
    },
    formActions: {
        marginTop: '20px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-start',
    },
    formButton: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor: '#00bcd4',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'background-color 0.3s',
    },
    serviciosGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    servicioCard: {
        backgroundColor: '#2c2c2c',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    servicioActions: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#1a1a1a',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    editModal: {
        backgroundColor: '#1f1f1f',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div>
          <h2>🎵 Panel Proveedor</h2>
          <div style={styles.navSection}>
            <button 
              style={styles.navButton(seccion === "servicios")} 
              onClick={() => { setSeccion("servicios"); setShowCrearServicioForm(false); }}>
              <FaClipboardList style={styles.navIcon} /> Mis Servicios
            </button>
            <button 
              style={styles.navButton(seccion === "solicitudes")} 
              onClick={() => { setSeccion("solicitudes"); setShowCrearServicioForm(false); }}>
              <FaRocket style={styles.navIcon} /> Solicitudes
            </button>
            <button 
              style={styles.navButton(seccion === "mensajes")} 
              onClick={() => { setSeccion("mensajes"); setShowCrearServicioForm(false); }}>
              <FaEnvelope style={styles.navIcon} /> Mensajes
            </button>
            <button 
              style={styles.navButton(seccion === "configuracion")} 
              onClick={() => { setSeccion("configuracion"); setShowCrearServicioForm(false); }}>
              <FaCogs style={styles.navIcon} /> Configuración
            </button>
          </div>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.navIcon} /> Cerrar sesión
        </button>
      </div>

      <div style={styles.mainContent}>
        {renderContenido()}
      </div>
    </div>
  );
};

export default OtrosDashboard;

