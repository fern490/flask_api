import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    fecha_nacimiento: "",
    genero: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre,
      apellido,
      usuario,
      fecha_nacimiento,
      genero,
      email,
      password,
      confirmPassword,
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
      !confirmPassword ||
      !rol
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("La contraseña y su confirmación no coinciden.");
      return;
    }

    const dataToSend = {
      nombre,
      apellido,
      usuario,
      fecha_nacimiento,
      genero,
      email,
      password,
      rol,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/registro-temporal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        localStorage.setItem("usuarioTemporalGuardado", JSON.stringify(dataToSend));
        setFormData({
          nombre: "",
          apellido: "",
          usuario: "",
          fecha_nacimiento: "",
          genero: "",
          email: "",
          password: "",
          confirmPassword: "",
          rol: "",
        });
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar usuario temporal en el servidor.");
      }
    } catch (err) {
      console.error("Error de red o del servidor:", err);
      setError("Ocurrió un error al intentar conectar con el servidor.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.boxBehind}></div>

        <h2>Crea una cuenta</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.row}>
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
          </div>

          <div style={styles.row}>
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
          </div>

          <div style={styles.row}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
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
              style={styles.input}
            >
              <option value="">Género...</option>
              <option value="Mujer">Mujer</option>
              <option value="Hombre">Hombre</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div style={styles.row}>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              style={{ ...styles.input, width: "100%" }}
            >
              <option value="">Seleccionar rol...</option>
              <option value="administrador">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Registrarse
          </button>

          <a
            href="/login"
            style={styles.loginLink}
          >
            ¿Ya tenés una cuenta? Iniciá sesión
          </a>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  paddingTop: "35px",
  paddingBottom: "10px",
  paddingLeft: "35px",
  paddingRight: "35px",
  },

  container: {
    width: "500px",
    minHeight: "auto",
    maxHeight: "auto",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    backgroundColor: "#425e62ff",
    color: "white",
    position: "relative",
    zIndex: 1,
  },

  boxBehind: {
    position: "absolute",
    width: "540px",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "2px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "12px",
    zIndex: 0,
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
    overflow: "hidden",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  input: {
    flex: 1,
    padding: "8px",
    fontSize: "13px",
    borderRadius: "5px",
    border: "0.8px solid #ccc",
    minWidth: "48%",
    marginBottom: "10px",
    outline: "none",
  },

  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginTop: "15px",
  },

  error: {
    color: "red",
    fontSize: "12px",
    margin: "8px 0",
  },

  loginLink: {
    marginTop: "20px",
    display: "block",
    color: "#a8e0ff",
    textDecoration: "none",
    fontSize: "12px",
  },
};

export default Register;
