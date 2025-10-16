import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d

const TrabajaConNosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    experiencia: "",
<<<<<<< HEAD
    localidad: "",
    edad: "",
    genero: "",
    cv_url: "",
  });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
=======
  });
  const [mensaje, setMensaje] = useState("");
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======

>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
    try {
      const response = await fetch("http://127.0.0.1:5000/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
<<<<<<< HEAD
=======

>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
      if (response.ok) {
        setMensaje("✅ ¡Tu postulación fue enviada correctamente!");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          especialidad: "",
          experiencia: "",
<<<<<<< HEAD
          localidad: "",
          edad: "",
          genero: "",
          cv_url: "",
=======
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
      overflow: "auto",
      position: "relative",
      padding: "14.44px",
      boxSizing: "border-box",
=======
      overflow: "hidden",
      position: "relative",
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
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
    },
    headerWrapper: {
      marginBottom: "16px",
      textAlign: "center",
    },
    title: {
      fontSize: "1.15rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "0.75rem",
      color: "#555",
      lineHeight: "1.4",
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
=======
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
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>
      <div style={styles.wrapper}>
<<<<<<< HEAD
        <div style={styles.headerWrapper}>
          <h1 style={styles.title}>¿Querés formar parte de Nosotros?</h1>
          <p style={styles.subtitle}>
            ¿Tenés talento para eventos? ¡Sumate y mostralo al mundo!
          </p>
        </div>
=======
        <h1 style={styles.title}>Trabajá con Nosotros</h1>
        <p style={styles.subtitle}>
          Si ofrecés servicios para eventos (DJ, fotografía, decoración,
          catering...), completá el formulario y sumate a nuestro equipo.
        </p>

>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
        <form onSubmit={handleSubmit} style={styles.formInputsWrapper}>
          <input
            type="text"
            name="nombre"
<<<<<<< HEAD
            placeholder="Nombre"
=======
            placeholder="Nombre completo"
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
            placeholder="Teléfono"
=======
            placeholder="Teléfono o WhatsApp"
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
            style={styles.input}
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
<<<<<<< HEAD
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
=======
            name="especialidad"
            placeholder="Especialidad (DJ, fotógrafo, decorador...)"
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
          <input
            type="url"
            name="cv_url"
            placeholder="Enlace a tu CV o portafolio (opcional)"
            style={styles.input}
            value={formData.cv_url}
            onChange={handleChange}
          />
=======
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#219150")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#27ae60")}
          >
            Enviar Postulación
          </button>
        </form>
<<<<<<< HEAD
        {mensaje && <p style={styles.message}>{mensaje}</p>}
        <button onClick={() => navigate("/login")} style={styles.loginRedirect}>
          Volver al inicio
        </button>
=======

        {mensaje && <p style={styles.message}>{mensaje}</p>}
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
      </div>
    </div>
  );
};

export default TrabajaConNosotros;
