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
              <p>Buscan: DJ, fotógrafo, decoración</p>
              <button style={styles.actionButton}>Postularme</button>
            </div>
            <div style={styles.card}>
              <h4>💼 Evento corporativo - 02/12/2025</h4>
              <p>Buscan: catering, sonido, luces</p>
              <button style={styles.actionButton}>Postularme</button>
            </div>
          </motion.div>
        );

      case "mensajes":
        return (
          <motion.div
            key="mensajes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>💬 Mensajería</h2>
            <p>Chateá con organizadores o clientes interesados en tus servicios.</p>
            <div style={styles.chatBox}>
              <p><strong>Cliente:</strong> Hola, me interesa tu servicio de DJ.</p>
              <p><strong>Vos:</strong> ¡Hola! Perfecto 😊 ¿Qué tipo de música buscan?</p>
              <input type="text" placeholder="Escribí un mensaje..." style={styles.input} />
              <button style={styles.actionButton}>Enviar</button>
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
            <h2>🧑 Perfil Profesional</h2>
            <p>Gestioná tu información, fotos y disponibilidad.</p>
            <form style={styles.form}>
              <input type="text" placeholder="Nombre comercial" style={styles.input} />
              <input type="text" placeholder="Especialidad" style={styles.input} />
              <textarea placeholder="Descripción breve de tus servicios" style={styles.textarea}></textarea>
              <button style={styles.actionButton}>Actualizar perfil</button>
            </form>
          </motion.div>
        );

      case "estadisticas":
        return (
          <motion.div
            key="estadisticas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>📊 Mis Estadísticas</h2>
            <ul>
              <li>Eventos realizados: 8</li>
              <li>Postulaciones aceptadas: 12</li>
              <li>Calificación promedio: ⭐ 4.7</li>
              <li>Ganancias estimadas: $45.200</li>
            </ul>
          </motion.div>
        );

      case "recursos":
        return (
          <motion.div
            key="recursos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>🧰 Recursos y Consejos</h2>
            <ul>
              <li>📖 Cómo destacar tu perfil profesional</li>
              <li>🎥 Video: Tips para eventos exitosos</li>
              <li>💡 Artículo: Cómo calcular tu presupuesto</li>
            </ul>
          </motion.div>
        );

      default:
        return <p>Seleccioná una sección.</p>;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎭 Panel de Servicios y Oportunidades</h1>
      <p style={styles.subtitle}>
        Bienvenido al panel para proveedores y colaboradores de eventos.
      </p>

      <nav style={styles.navbar}>
        {["servicios", "solicitudes", "mensajes", "perfil", "estadisticas", "recursos"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setSeccion(item)}
              style={{
                ...styles.navButton,
                backgroundColor: seccion === item ? "#f39c12" : "#34495e",
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          )
        )}
      </nav>

      <div style={styles.content}>{renderContenido()}</div>

      <div style={{ marginTop: "30px" }}>
        {onLogout && (
          <button onClick={onLogout} style={styles.logoutButton}>
            🔒 Cerrar sesión
          </button>
        )}
        <Link to="/" style={styles.link}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
  },
  title: {
    fontSize: "2rem",
    color: "#f1c40f",
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  navbar: {
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
    padding: "8px 15px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    minHeight: "80px",
  },
  chatBox: {
    backgroundColor: "#3d566e",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "left",
  },
};

export default OtrosDashboard;
