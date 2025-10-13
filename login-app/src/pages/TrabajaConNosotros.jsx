import React, { useState } from "react";

const TrabajaConNosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    experiencia: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("✅ ¡Tu postulación fue enviada correctamente!");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          especialidad: "",
          experiencia: "",
        });
      } else {
        setMensaje("⚠️ Hubo un error al enviar tu postulación.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor.");
    }
  };

  const styles = {
    background: {
      backgroundImage:
        "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1470&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      zIndex: 0,
    },
    wrapper: {
      position: "relative",
      zIndex: 1,
      width: "400px",
      maxWidth: "90%",
      padding: "30px",
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(6px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "550px",
      boxSizing: "border-box",
      textAlign: "center",
      animation: "fadeIn 0.6s ease-in-out",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "30px",
      lineHeight: "1.5",
    },
    formInputsWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      flexGrow: 1,
      justifyContent: "center",
    },
    input: {
      width: "90%",
      padding: "12px",
      marginBottom: "14px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      backgroundColor: "#f7f9fa",
      color: "#000",
      transition: "all 0.2s ease",
    },
    textarea: {
      width: "90%",
      padding: "12px",
      height: "100px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      resize: "vertical",
      fontSize: "15px",
      backgroundColor: "#f7f9fa",
      marginBottom: "18px",
      color: "#000",
    },
    button: {
      width: "90%",
      padding: "12px",
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "background-color 0.3s ease, transform 0.1s ease",
    },
    message: {
      marginTop: "20px",
      color: "#2ecc71",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Trabajá con Nosotros</h1>
        <p style={styles.subtitle}>
          Si ofrecés servicios para eventos (DJ, fotografía, decoración,
          catering...), completá el formulario y sumate a nuestro equipo.
        </p>

        <form onSubmit={handleSubmit} style={styles.formInputsWrapper}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            style={styles.input}
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono o WhatsApp"
            style={styles.input}
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad (DJ, fotógrafo, decorador...)"
            style={styles.input}
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
          <textarea
            name="experiencia"
            placeholder="Contanos un poco sobre tu experiencia..."
            style={styles.textarea}
            value={formData.experiencia}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#219150")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#27ae60")}
          >
            Enviar Postulación
          </button>
        </form>

        {mensaje && <p style={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default TrabajaConNosotros;
