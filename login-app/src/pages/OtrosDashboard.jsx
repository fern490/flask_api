import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const OtrosDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("servicios");
  const [servicios, setServicios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const proveedorId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000/";

const fetchServicios = useCallback(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/servicios?proveedor_id=${proveedorId}`);
    if (!response.ok) throw new Error("Error al obtener servicios");
    const data = await response.json();
    setServicios(data);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
  }
}, [proveedorId]);

const fetchSolicitudes = useCallback(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/solicitudes`);
    if (!response.ok) throw new Error("Error al obtener solicitudes");
    const data = await response.json();
    setSolicitudes(data);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
  }
}, []); // No depende de nada externo

const fetchMensajes = useCallback(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/mensajes?proveedor_id=${proveedorId}`);
    if (!response.ok) throw new Error("Error al obtener mensajes");
    const data = await response.json();
    setMensajes(data);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
}, [proveedorId]);

useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    if (proveedorId) {
      await Promise.all([fetchServicios(), fetchSolicitudes(), fetchMensajes()]);
    } else {
      onLogout();
    }
    setIsLoading(false);
  };

  loadData();
}, [proveedorId, onLogout, fetchServicios, fetchSolicitudes, fetchMensajes]);


  const renderContenido = () => {
    if (isLoading) return <p style={{ textAlign: "center" }}>Cargando datos...</p>;

    switch (seccion) {
      case "servicios":
        return (
          <motion.div key="servicios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>🎧 Mis Servicios ({servicios.length})</h2>
            <p>Publicá, editá o eliminá los servicios que ofrecés en eventos.</p>
            <button
              style={styles.actionButton}
              onClick={() => (window.location.href = "/crear-servicio")}
            >
              Agregar nuevo servicio
            </button>
            <div style={styles.cardsGrid}>
              {servicios.length > 0 ? (
                servicios.map((s) => (
                  <div key={s.id} style={styles.card}>
                    <h4>{s.nombre_servicio}</h4>
                    <p>{s.descripcion || "Sin descripción"}</p>
                    <p style={{ fontWeight: "bold" }}>Costo: ${s.costo}</p>
                  </div>
                ))
              ) : (
                <p>No tienes servicios publicados.</p>
              )}
            </div>
          </motion.div>
        );

      case "solicitudes":
        return (
          <motion.div key="solicitudes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>🔔 Solicitudes de Eventos ({solicitudes.length})</h2>
            <p>Consultá eventos futuros que buscan personal o proveedores.</p>
            <div style={styles.cardsGrid}>
              {solicitudes.length > 0 ? (
                solicitudes.map((sol) => (
                  <div key={sol.id} style={styles.card}>
                    <h4>🎉 {sol.nombre_evento}</h4>
                    <p>Fecha: {sol.fecha_evento}</p>
                    <p>
                      <small>
                        Salón ID: {sol.salon_id} | Cliente ID: {sol.usuario_id}
                      </small>
                    </p>
                    <button style={styles.actionButton}>Ver Detalles/Postularse</button>
                  </div>
                ))
              ) : (
                <p>No hay solicitudes de eventos futuras por el momento.</p>
              )}
            </div>
          </motion.div>
        );

      case "mensajes":
        return (
          <motion.div key="mensajes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>📧 Mensajes Recibidos ({mensajes.length})</h2>
            <p>Comunícate con clientes interesados en tus servicios.</p>
            <div style={styles.cardsGrid}>
              {mensajes.length > 0 ? (
                mensajes.map((msg) => (
                  <div key={msg.id} style={styles.card}>
                    <h4>De: {msg.cliente_nombre}</h4>
                    <p style={{ fontStyle: "italic" }}>"{msg.mensaje}"</p>
                    <small>Fecha: {new Date(msg.fecha).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>No tienes mensajes nuevos.</p>
              )}
            </div>
          </motion.div>
        );

      case "configuracion":
        return (
          <motion.div key="configuracion" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>⚙️ Configuración de Perfil</h2>
            <p>Configura tu información de contacto, especialidades y servicios predeterminados.</p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handleLogout = () => onLogout();

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#1e2a38",
      color: "white",
      fontFamily: "Inter, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#273746",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "25px 20px",
      boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
    },
    navSection: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    navButton: (active) => ({
      padding: "12px 15px",
      border: "none",
      borderRadius: "8px",
      color: "white",
      textAlign: "left",
      cursor: "pointer",
      backgroundColor: active ? "#3498db" : "transparent",
      transition: "all 0.3s ease",
      fontWeight: active ? "bold" : "normal",
    }),
    logoutButton: {
      backgroundColor: "#e74c3c",
      border: "none",
      padding: "12px",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      overflowY: "auto",
    },
    contentBox: {
      backgroundColor: "#34495e",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginTop: "20px",
    },
    card: {
      backgroundColor: "#3d566e",
      padding: "15px",
      borderRadius: "10px",
      borderLeft: "4px solid #3498db",
    },
    actionButton: {
      backgroundColor: "#27ae60",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <h2>🎵 Panel</h2>
          <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
            Proveedor ID: <strong>{proveedorId}</strong>
          </p>
          <div style={styles.navSection}>
            <button style={styles.navButton(seccion === "servicios")} onClick={() => setSeccion("servicios")}>
              Mis Servicios
            </button>
            <button style={styles.navButton(seccion === "solicitudes")} onClick={() => setSeccion("solicitudes")}>
              Solicitudes
            </button>
            <button style={styles.navButton(seccion === "mensajes")} onClick={() => setSeccion("mensajes")}>
              Mensajes
            </button>
            <button style={styles.navButton(seccion === "configuracion")} onClick={() => setSeccion("configuracion")}>
              Configuración
            </button>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Cerrar sesión
        </button>
      </div>

      {/* Main content */}
      <div style={styles.mainContent}>
        <div style={styles.contentBox}>{renderContenido()}</div>
      </div>
    </div>
  );
};

export default OtrosDashboard;
