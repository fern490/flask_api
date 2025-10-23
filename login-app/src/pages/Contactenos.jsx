import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contactenos = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      const data = await response.json();
      if (response.ok) {
        setEnviado(true);
        console.log("✅ Mensaje guardado en la base de datos:", data);
      } else {
        console.error("⚠️ Error al enviar:", data.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

const styles = {
  background: {
    backgroundImage: "url('https://images.unsplash.com/photo-1515165562835-c4c72f792f53?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    paddingTop: "70px",
  },
  container: {
    width: "326px",
    paddingTop: "18px",
    paddingRight: "22px",
    paddingBottom: "0px",
    paddingLeft: "22px",
    borderRadius: "10px",
    backgroundColor: "rgba(178, 210, 250, 0.95)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "14px",
    color: "#2c3e50",
    textAlign: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: "4px",
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "7px 9px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "7px 9px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontSize: "14px",
    height: "85px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "9px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginBottom: "4px",
  },
  successMessage: {
    color: "#27ae60",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
    fontSize: "13.5px",
  },
  contactInfo: {
    marginTop: "4px",
    fontSize: "12.5px",
    color: "#555",
    textAlign: "center",
    lineHeight: "1.3",
  },
  mailLink: {
    color: "#3498db",
    textDecoration: "none",
    fontSize: "12.5px",
  },
  link: {
    marginTop: "4px",
    marginBottom: "25px",
    textDecoration: "none",
    color: "#2c3e50",
    fontWeight: "bold",
    fontSize: "12.5px",
  },
};


  return (
    <div style={styles.background}>
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

        <div style={styles.contactInfo}>
          <p>También podés escribirnos directamente a:</p>
          <a href="mailto:jjonathanvalle@gmail.com" style={styles.mailLink}>
            jjonathanvalle@gmail.com
          </a>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/541138824999"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mailLink}
            >
              +54 11 3882 4999
            </a>
          </p>
        </div>

        <Link to="/" style={styles.link}>
          Ir a la página de inicio
        </Link>
      </div>
    </div>
  );
};

export default Contactenos;