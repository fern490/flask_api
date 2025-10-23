import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrabajaConNosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    experiencia: "",
    localidad: "",
    edad: "",
    genero: "",
    cv_url: "",
  });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

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
          localidad: "",
          edad: "",
          genero: "",
          cv_url: "",
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
        "url('')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      height: "auto",
      minWidth: "100vw",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "scroll",
      position: "relative",
      paddingTop: "14.44px",
      paddingBottom: "0px",
      boxSizing: "border-box",
    },
    overlay: {
      position: "fixed",
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
      width: "432.6px",
      maxWidth: "100%",
      padding: "21.66px 18.05px",
      borderRadius: "7.22px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(6px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxSizing: "border-box",
      animation: "fadeIn 0.6s ease-in-out",
      transformOrigin: "top center",
      marginTop: "55px"
    },
    headerWrapper: {
      marginBottom: "8px",
      textAlign: "center",
    },
    title: {
      fontSize: "1.15rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "4px",
    },
    subtitle: {
      fontSize: "0.75rem",
      color: "#555",
      lineHeight: "1.4",
       marginTop: "0",
  marginBottom: "0",
    },
    formInputsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      gap: "10px",
      boxSizing: "border-box",
    },
    input: {
      flex: "1 1 calc(50% - 10px)",
      padding: "8.66px 7.22px",
      marginBottom: "10.83px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      fontSize: "0.75rem",
      backgroundColor: "#f7f9fa",
      color: "#000",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
      minWidth: "140px",
    },
    textarea: {
      width: "100%",
      padding: "8.66px 7.22px",
      height: "57.76px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      resize: "vertical",
      fontSize: "0.75rem",
      backgroundColor: "#f7f9fa",
      marginBottom: "10.83px",
      color: "#000",
      boxSizing: "border-box",
    },
    select: {
      flex: "1 1 calc(50% - 10px)",
      padding: "8.66px 7.22px",
      marginBottom: "10.83px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      fontSize: "0.75rem",
      backgroundColor: "#f7f9fa",
      color: "#000",
      boxSizing: "border-box",
      minWidth: "140px",
    },
    button: {
      width: "100%",
      padding: "10.11px",
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "4.33px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.8rem",
      transition: "background-color 0.3s ease, transform 0.1s ease",
      marginTop: "5px",
    },
    message: {
      marginTop: "14.44px",
      color: "#2ecc71",
      fontWeight: "bold",
      fontSize: "0.75rem",
    },
    loginRedirect: {
      marginTop: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 12px",
      cursor: "pointer",
      fontSize: "0.75rem",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>
      <div style={styles.wrapper}>
        <div style={styles.headerWrapper}>
          <h1 style={styles.title}>¿Querés formar parte de Nosotros?</h1>
          <p style={styles.subtitle}>
            ¿Tenés talento para eventos? ¡Sumate y mostralo al mundo!
          </p>
        </div>
        <form onSubmit={handleSubmit} style={styles.formInputsWrapper}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
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
            placeholder="Teléfono"
            style={styles.input}
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="localidad"
            placeholder="Localidad"
            style={styles.input}
            value={formData.localidad}
            onChange={handleChange}
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            style={styles.input}
            value={formData.edad}
            onChange={handleChange}
          />
          <select
            name="genero"
            style={styles.select}
            value={formData.genero}
            onChange={handleChange}
          >
            <option value="">Seleccioná tu género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad"
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
          <input
            type="url"
            name="cv_url"
            placeholder="Enlace a tu CV o portafolio (opcional)"
            style={styles.input}
            value={formData.cv_url}
            onChange={handleChange}
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
        <button onClick={() => navigate("/login")} style={styles.loginRedirect}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default TrabajaConNosotros;