import React, { useState } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !fechaNacimiento || !genero || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setError("");

      const response = await fetch("http://127.0.0.1:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, fechaNacimiento, genero, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirige a la página de login o a otro lugar si es necesario
        alert("Cuenta creada exitosamente");
      } else {
        setError(data.message || "Error al crear cuenta");
      }
    } catch (err) {
      console.error("Error al conectar:", err);
      setError("Error al conectar con el servidor. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          style={styles.input}
        />
        <fieldset style={styles.fieldset}>
          <legend>Género</legend>
          <label>
            <input
              type="radio"
              name="genero"
              value="Mujer"
              checked={genero === "Mujer"}
              onChange={(e) => setGenero(e.target.value)}
            />
            Mujer
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="genero"
              value="Hombre"
              checked={genero === "Hombre"}
              onChange={(e) => setGenero(e.target.value)}
            />
            Hombre
          </label>
        </fieldset>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Registrarse
        </button>
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
