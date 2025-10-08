import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    email: "",
    rol: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, apellido, fecha_nacimiento, genero, email, rol } = formData;

    // Validación simple
    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !rol) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      localStorage.setItem("usuarioTemporal", JSON.stringify(formData));
      alert("¡Registro éxitoso!");
      console.log("Usuario temporal:", formData);

      setFormData({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        genero: "",
        email: "",
        rol: "",
      });
      setError("");
    } catch (err) {
      console.error("Error al guardar en localStorage:", err);
      setError("Ocurrió un error al guardar los datos.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}

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
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          style={styles.input}
        />

        <fieldset style={styles.fieldset}>
          <legend>Género</legend>
          <label>
            <input
              type="radio"
              name="genero"
              value="Mujer"
              checked={formData.genero === "Mujer"}
              onChange={handleChange}
            />
            Mujer
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="genero"
              value="Hombre"
              checked={formData.genero === "Hombre"}
              onChange={handleChange}
            />
            Hombre
          </label>
        </fieldset>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Seleccionar rol...</option>
          <option value="administrador">Administrador</option>
          <option value="cliente">Cliente</option>
          <option value="otros">Otros</option>
        </select>

        <button type="submit" style={styles.button}>
          Registrarse
        </button>
        <a
          href="/login"
          style={{
            marginTop: "10px",
            display: "block",
            color: "#a8e0ff",
            textDecoration: "none",
          }}
        >
          ¿Ya tenés una cuenta? Iniciá sesión
        </a>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "320px",
    margin: "20px auto",
    padding: "20px",
    border: "5px solid #cccccc3d",
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    backgroundColor: "#425e62ff",
    color: "white",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },

  fieldset: {
    margin: "15px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    textAlign: "left",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    cursor: "pointer",
  },

  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
  },

  error: {
    color: "red",
    fontSize: "14px",
    margin: "10px 0",
  },
};

export default Register;
