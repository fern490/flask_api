import React, { useState } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("mujer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !fechaNacimiento || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Aquí puedes hacer la llamada al backend para guardar el usuario
    console.log("Datos de usuario:", {
      nombre,
      apellido,
      fechaNacimiento,
      genero,
      email,
      password,
    });

    // Aquí se podría redirigir o hacer algo más luego de un registro exitoso
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
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.dateContainer}>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.radioContainer}>
          <label>
            <input
              type="radio"
              value="mujer"
              checked={genero === "mujer"}
              onChange={() => setGenero("mujer")}
            />
            Mujer
          </label>
          <label>
            <input
              type="radio"
              value="hombre"
              checked={genero === "hombre"}
              onChange={() => setGenero("hombre")}
            />
            Hombre
          </label>
          <label>
            <input
              type="radio"
              value="personalizado"
              checked={genero === "personalizado"}
              onChange={() => setGenero("personalizado")}
            />
            Personalizado
          </label>
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Contraseña nueva"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Registrarte
        </button>
      </form>
    </div>
  );
};

// Estilos
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
  dateContainer: {
    margin: "10px 0",
  },
  radioContainer: {
    margin: "10px 0",
    textAlign: "left",
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
