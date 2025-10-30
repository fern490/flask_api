<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
 
const OtrosDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("servicios");

  const renderContenido = () => {
    switch (seccion) {
      case "servicios":
        return (
          <motion.div
            key="servicios"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>🎧 Mis Servicios</h2>
            <p>Publicá, editá o eliminá los servicios que ofrecés en eventos.</p>
            <ul>
              <li>📸 Fotografía profesional</li>
              <li>🎶 DJ para eventos</li>
              <li>🍽️ Catering y mozos</li>
            </ul>
            <button style={styles.actionButton}>Agregar nuevo servicio</button>
          </motion.div>
        );

      case "solicitudes":
        return (
          <motion.div
            key="solicitudes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>🔔 Solicitudes de Servicio</h2>
            <p>Consultá eventos que buscan personal o proveedores.</p>
            <div style={styles.card}>
              <h4>🎉 Cumpleaños 15 años - 20/11/2025</h4>
              <p>Buscan: DJ, fotógrafo, decoración...</p>
              <button style={styles.actionButton}>Ver detalles</button>
            </div>
          </motion.div>
        );

      case "perfil":
        return (
          <motion.div
            key="perfil"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>👤 Mi Perfil</h2>
            <p>Actualizá tu información personal y de contacto.</p>
            <ul>
              <li>Nombre: Juan Pérez</li>
              <li>Especialidad: Fotógrafo</li>
            </ul>
            <button style={styles.actionButton}>Editar perfil</button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Proveedores y Otros</h1>
      
      <div style={styles.navContainer}>
        <button
          style={{ ...styles.navButton, backgroundColor: seccion === "servicios" ? "#2ecc71" : "#27ae60" }}
          onClick={() => setSeccion("servicios")}
        >
          Mis Servicios
        </button>
        <button
          style={{ ...styles.navButton, backgroundColor: seccion === "solicitudes" ? "#2ecc71" : "#27ae60" }}
          onClick={() => setSeccion("solicitudes")}
        >
          Solicitudes
        </button>
        <button
          style={{ ...styles.navButton, backgroundColor: seccion === "perfil" ? "#2ecc71" : "#27ae60" }}
          onClick={() => setSeccion("perfil")}
        >
          Perfil
        </button>
        <button onClick={onLogout} style={styles.logoutButton}>
          Cerrar Sesión
        </button>
=======
import React, { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaConciergeBell, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';


const ClienteDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("eventos");
  const [eventos, setEventos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // El ID del usuario se obtiene del localStorage después del login
  const userId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000";

  // Función para obtener los eventos del cliente
  const fetchEventos = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/eventos/cliente/${userId}`);
      if (!response.ok) throw new Error("Error al obtener eventos");
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Función para obtener todos los servicios (provistos por rol 'Otros')
  const fetchServicios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/servicios/todos`);
      if (!response.ok) throw new Error("Error al obtener servicios");
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (seccion === "eventos") {
      fetchEventos();
    } else if (seccion === "servicios") {
      fetchServicios();
    }
  }, [seccion, fetchEventos, fetchServicios]);


  // --- Renderización de Contenido por Sección ---
  
  const renderEventos = () => (
    <div>
      <h3>Mis Eventos Solicitados ({eventos.length})</h3>
      {isLoading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>Aún no has solicitado ningún evento.</p>
      ) : (
        <ul style={styles.list}>
          {eventos.map((evento) => (
            <li key={evento.id} style={styles.listItem(evento.estado)}>
              <h4>{evento.nombre_evento}</h4>
              <p>Fecha: {evento.fecha}</p>
              <p>Estado: <strong>{evento.estado.toUpperCase()}</strong></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderServicios = () => (
    <div>
      <h3>Servicios Disponibles ({servicios.length})</h3>
      {isLoading ? (
        <p>Cargando servicios...</p>
      ) : servicios.length === 0 ? (
        <p>No hay servicios de proveedores disponibles.</p>
      ) : (
        <ul style={styles.list}>
          {servicios.map((servicio) => (
            <li key={servicio.id} style={styles.serviceItem}>
              <h4>{servicio.nombre} (${servicio.costo.toFixed(2)})</h4>
              <p>{servicio.descripcion}</p>
              {/* Aquí se podría añadir un botón para 'Solicitar' o 'Contactar' */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderMensajes = () => (
    <div>
      <h3>Mensajes</h3>
      <p>Funcionalidad para ver mensajes con proveedores (rol 'Otros') en desarrollo.</p>
      {/* Se podría integrar la lógica de fetchMensajes aquí, similar a OtrosDashboard */}
    </div>
  );

  const renderContenido = () => {
    switch (seccion) {
      case "eventos":
        return renderEventos();
      case "servicios":
        return renderServicios();
      case "mensajes":
        return renderMensajes();
      default:
        return <h2>Selecciona una sección</h2>;
    }
  };


  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    mainContent: {
      flexGrow: 1,
      padding: "30px",
    },
    title: {
      color: "#3498db",
      marginBottom: "30px",
    },
    navButton: (activo) => ({
      width: "100%",
      backgroundColor: activo ? "#3498db" : "transparent",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "left",
      cursor: "pointer",
      marginBottom: "10px",
      transition: "background-color 0.3s",
      display: "flex",
      alignItems: "center",
    }),
    navIcon: {
      marginRight: '10px'
    },
    logoutButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    },
    contentBox: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    },
    list: {
        listStyle: 'none',
        padding: 0
    },
    listItem: (estado) => ({
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '5px',
        borderLeft: `5px solid ${estado === 'aprobado' ? '#2ecc71' : estado === 'rechazado' ? '#e74c3c' : '#f39c12'}`,
        backgroundColor: '#ecf0f1',
    }),
    serviceItem: {
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '5px',
        borderLeft: '5px solid #9b59b6',
        backgroundColor: '#ecf0f1',
    }
  };


  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <h2>👤 Panel Cliente</h2>
          <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
            ID Cliente: <strong>{userId || 'N/A'}</strong>
          </p>
          <div style={styles.navSection}>
            <button 
                style={styles.navButton(seccion === "eventos")} 
                onClick={() => setSeccion("eventos")}
            >
                <FaCalendarAlt style={styles.navIcon} />
                Mis Eventos
            </button>
            <button 
                style={styles.navButton(seccion === "servicios")} 
                onClick={() => setSeccion("servicios")}
            >
                <FaConciergeBell style={styles.navIcon} />
                Servicios (Proveedores)
            </button>
            <button 
                style={styles.navButton(seccion === "mensajes")} 
                onClick={() => setSeccion("mensajes")}
            >
                <FaEnvelope style={styles.navIcon} />
                Mensajes
            </button>
          </div>
        </div>

        <button onClick={onLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.navIcon} />
          Cerrar sesión
        </button>
      </div>

      {/* Main content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Área Personal del Cliente</h1>
        <div style={styles.contentBox}>{renderContenido()}</div>
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
      </div>

      <div style={styles.content}>
        {renderContenido()}
      </div>

      <Link to="/" style={styles.link}>
        Ir a la página de inicio
      </Link>
    </div>
  );
};

<<<<<<< HEAD
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "20px",
    paddingTop: "80px",
    width: "100%",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
    color: "#f1c40f",
  },
  navContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "20px",
  },
  navButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#34495e",
    padding: "25px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "800px",
    minHeight: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    textAlign: "left",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    display: "block",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "15px",
  },
  card: {
    backgroundColor: "#3d566e",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  actionButton: {
    backgroundColor: "#27ae60",
    border: "none",
    padding: "8px 12px",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  }
};

export default OtrosDashboard;
=======
export default ClienteDashboard;
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
