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
    wrapper: {
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
<<<<<<< HEAD
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "25px",
      margin: "0 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "60px"
=======
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      padding: "20px", 
      margin: "0 20px", 
>>>>>>> f13109f0ee2f7941899bd32e75f388465aa488db
    },

    container: {
      width: "100%",
      maxWidth: "280px",
      padding: "20px 15px",
      borderRadius: "16px",
      background: "rgba(59, 117, 126, 0.7)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",      
      border: "1px solid rgba(255, 255, 255, 0.2)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
    },

    title: {
      fontSize: "21px",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#fff",
      textShadow: "0 0 6px rgba(255,255,255,0.6)",
    },
    
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    input: {
      margin: "10px 0",
      padding: "10px 12px",
      fontSize: "15px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      outline: "none",
      transition: "0.3s ease",
    },

    fieldset: {
      margin: "12px 0",
      padding: "10px",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "8px",
      textAlign: "left",
      color: "#ddd",
    },

    label: {
      display: "block",
      marginBottom: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },

    button: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      borderRadius: "8px",
      border: "none",
      background: "linear-gradient(90deg, #6a11cb, #2575fc)",
      color: "#fff",
      fontWeight: "600",
      fontSize: "15px",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },

    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 0 10px rgba(106,17,203,0.6)",
    },

    registerButton: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "transparent",
      color: "#fff",
      fontWeight: "500",
      fontSize: "15px",
      cursor: "pointer",
      transition: "background 0.3s ease, border 0.3s ease",
    },

    error: {
      color: "#ff6b6b",
      fontSize: "13px",
      margin: "8px 0",
    },
  };
  
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredRegister, setHoveredRegister] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

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
              />{" "}
              Administrador
            </label>

            <label style={styles.label}>
              <input
                type="radio"
                name="role"
                value="cliente"
                checked={role === "cliente"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              Cliente
            </label>

            <label style={styles.label}>
              <input
                type="radio"
                name="role"
                value="otros"
                checked={role === "otros"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              Otros
            </label>
          </fieldset>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hoveredButton ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            Entrar
          </button>
        </form>

        <button
          onClick={onRegisterClick}
          style={{
            ...styles.registerButton,
            ...(hoveredRegister
              ? { background: "rgba(255,255,255,0.2)", border: "1px solid #fff" }
              : {}),
          }}
          onMouseEnter={() => setHoveredRegister(true)}
          onMouseLeave={() => setHoveredRegister(false)}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;
