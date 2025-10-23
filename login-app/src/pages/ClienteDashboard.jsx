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