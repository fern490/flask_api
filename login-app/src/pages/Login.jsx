import React, { useState } from "react";


const Login = ({ onLoginSuccess, onRegisterClick }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Por favor, completa todos los campos y selecciona un rol");
      return;
    }

    try {
      console.log("Enviando datos:", { email, password, role });
      setError("");

      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token); 
        onLoginSuccess(data.role); 
      } else {
        setError(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Hubo un problema con el servidor al intentar iniciar sesión.");
    }
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
      marginTop: "10px",
    },
    
    registerButton: {
      padding: "10px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "16px",
      marginTop: "10px",
    },

    error: {
      color: "red",
      fontSize: "14px",
      margin: "10px 0",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="current-password"
          required
        />

        <fieldset style={styles.fieldset}>
          <legend>Selecciona un rol:</legend>

          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Administrador
          </label>

          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="cliente"
              checked={role === "cliente"}
              onChange={(e) => setRole(e.target.value)}
            />
            Cliente
          </label>

          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="otros"
              checked={role === "otros"}
              onChange={(e) => setRole(e.target.value)}
            />
            Otros
          </label>
        </fieldset>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
      {}
      <button onClick={onRegisterClick} style={styles.registerButton}>
        Registrarse
      </button>
    </div>
  );
};

export default Login;