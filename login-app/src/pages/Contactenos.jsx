import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contactenos = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario.
    // Por ahora, solo simula el envío y muestra un mensaje de éxito.
    console.log("Formulario enviado:", { nombre, email, mensaje });
    setEnviado(true);
  };

  const styles = {
    container: {
      width: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
      textAlign: "center",
    },
    form: {
      width: "100%",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      resize: "vertical",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    successMessage: {
      color: "#2ecc71",
      fontWeight: "bold",
      marginTop: "20px",
    },
    link: {
      marginTop: "15px",
      textDecoration: "none",
      color: "#3498db",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contáctenos</h1>
      {enviado ? (
        <p style={styles.successMessage}>
          ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            style={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label style={styles.label} htmlFor="email">
            Correo
          </label>
          <input
            type="email"
            id="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label} htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows="5"
            style={styles.textarea}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          ></textarea>

          <button type="submit" style={styles.button}>
            Enviar
          </button>
        </form>
      )}
      <Link to="/" style={styles.link}>
        Ir a la página de inicio
      </Link>
    </div>
  );
};

export default Contactenos;
