import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, Administrador</h1>
      <p style={styles.text}>
        Tienes acceso a todas las funciones administrativas.
      </p>
      <div style={styles.linkContainer}>
        <Link to="/" style={styles.link}>
          Ir a la página de inicio
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#e74c3c",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  linkContainer: {
    marginTop: "20px",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  },
};

export default AdminDashboard;
