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
      backgroundImage:
        "url('https://images.unsplash.com/photo-1515165562835-c4c72f792f53?auto=format&fit=crop&w=1470&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      paddingTop: "65px",
      boxSizing: "border-box",
      overflow: "hidden",

    },
    container: {
      width: "326px",
      padding: "18px 22px",
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.25), inset 0 0 10px rgba(255, 255, 255, 0.4)",
      border: "1.5px solid rgba(255, 255, 255, 0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "#2c3e50",
      backdropFilter: "blur(4px)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "15px",
      textAlign: "center",
      color: "#2c3e50",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    label: {
      alignSelf: "flex-start",
      marginBottom: "5px",
      fontWeight: "600",
      color: "#2c3e50",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccd1d9",
      backgroundColor: "#fff",
      fontSize: "14px",
      color: "#2c3e50",
      boxSizing: "border-box",
      outline: "none",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    textarea: {
      width: "100%",
      padding: "8px 10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccd1d9",
      resize: "vertical",
      backgroundColor: "#fff",
      fontSize: "14px",
      color: "#2c3e50",
      height: "85px",
      boxSizing: "border-box",
      outline: "none",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    button: {
      width: "100%",
      padding: "10px",
      background:
        "linear-gradient(90deg, #ff7e5f 0%, #c77332ff 100%)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
      transition: "transform 0.2s ease, box-shadow 0.3s ease",
      marginBottom: "1px",
      boxShadow: "0 4px 10px rgba(255, 126, 95, 0.4)",
    },
    successMessage: {
      color: "#27ae60",
      fontWeight: "bold",
      marginTop: "12px",
      textAlign: "center",
      fontSize: "14px",
    },
    contactInfo: {
      marginTop: "6px",
      fontSize: "13px",
      color: "#555",
      textAlign: "center",
      lineHeight: "1.4",
    },
    mailLink: {
      color: "#2980b9",
      textDecoration: "none",
      fontWeight: "500",
    },
    link: {
      marginTop: "4px",
      marginBottom: "20px",
      textDecoration: "none",
      color: "#2c3e50",
      fontWeight: "bold",
      fontSize: "13px",
      transition: "color 0.3s ease",
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
              onFocus={(e) =>
                (e.target.style.borderColor = "#74b9ff")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "#ccd1d9")
              }
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
              onFocus={(e) =>
                (e.target.style.borderColor = "#74b9ff")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "#ccd1d9")
              }
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
              onFocus={(e) =>
                (e.target.style.borderColor = "#74b9ff")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "#ccd1d9")
              }
              required
            ></textarea>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 14px rgba(255, 126, 95, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "none";
                e.target.style.boxShadow =
                  "0 4px 10px rgba(255, 126, 95, 0.4)";
              }}
            >
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