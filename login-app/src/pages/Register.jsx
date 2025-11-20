import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    fecha_nacimiento: "",
    genero: "",
    email: "",
    password: "",
    rol: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      nombre,
      apellido,
      usuario,
      fecha_nacimiento,
      genero,
      email,
      password,
      rol,
    } = formData;

    if (
      !nombre ||
      !apellido ||
      !usuario ||
      !fecha_nacimiento ||
      !genero ||
      !email ||
      !password ||
      !rol
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }


    try {
      const response = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Usuario registrado correctamente. Ya puedes iniciar sesión."
        );
        setFormData({
          nombre: "",
          apellido: "",
          usuario: "",
          fecha_nacimiento: "",
          genero: "",
          email: "",
          password: "",
          rol: "",
        });
      } else {
        setError(data.error || "Error al registrar el usuario.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
  };

  const styles = {
    background: {
      backgroundImage: "url('')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "auto",
      paddingTop: "20px",
      paddingBottom: "20px",
      position: "relative",
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
      animation: "fadeIn 0.6s ease-in-out",
      marginTop: "40px",
    },
    title: {
      fontSize: "1.15rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "4px",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "0.75rem",
      color: "#555",
      marginBottom: "10px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      width: "100%",
      justifyContent: "space-between",
    },
    input: {
      flex: "1 1 calc(50% - 10px)",
      padding: "8.66px 7.22px",
      marginBottom: "10.83px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      backgroundColor: "#f7f9fa",
      fontSize: "0.75rem",
      minWidth: "140px",
      boxSizing: "border-box",
      color: "#000",
    },
    select: {
      flex: "1 1 calc(50% - 10px)",
      padding: "8.66px 7.22px",
      marginBottom: "10.83px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      backgroundColor: "#f7f9fa",
      fontSize: "0.75rem",
      minWidth: "140px",
      boxSizing: "border-box",
      color: "#000",
    },
    fullWidthSelect: {
      width: "100%",
      padding: "8.66px 7.22px",
      borderRadius: "4.33px",
      border: "1px solid #ccc",
      backgroundColor: "#f7f9fa",
      fontSize: "0.75rem",
      marginBottom: "10.83px",
      color: "#000",
    },
    error: {
      width: "100%",
      color: "red",
      fontSize: "0.75rem",
      marginBottom: "5px",
      textAlign: "center",
    },
    success: {
      width: "100%",
      color: "#27ae60",
      fontSize: "0.75rem",
      marginBottom: "5px",
      textAlign: "center",
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
      marginTop: "5px",
    },
    link: {
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

  const placeholderStyle = `
    ::placeholder {
      color: #000;
      opacity: 0.6;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = placeholderStyle;
  document.head.appendChild(styleSheet);

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>

      <div style={styles.wrapper}>
        <h1 style={styles.title}>Crear una cuenta</h1>
        <p style={styles.subtitle}>Completá tus datos para registrarte</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="usuario"
            placeholder="Nombre de usuario"
            value={formData.usuario}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Género</option>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
            <option value="Otro">Otro</option>
          </select>

          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            style={styles.fullWidthSelect}
          >
            <option value="">Seleccioná tu rol</option>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="otros">Otros</option>
          </select>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#219150")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#27ae60")}
          >
            Registrarse
          </button>
          
        </form>

        <button onClick={() => navigate("/login")} style={styles.link}>
          ¿Ya tenés una cuenta? Iniciá sesión
        </button>
      </div>
    </div>
  );
};



export default Register;
