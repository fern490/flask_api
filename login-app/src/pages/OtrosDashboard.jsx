import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a la página principal</h1>
      <p style={styles.text}>Has iniciado sesión con un rol genérico.</p>
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
    backgroundColor: "#7f8c8d",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#f39c12",
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

export default Home;
