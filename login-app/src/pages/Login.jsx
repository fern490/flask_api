import React, { useState, useEffect } from "react";
import { FaUserShield, FaUser, FaBriefcase, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Login = ({ onLoginSuccess, onRegisterClick }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";
  const GOOGLE_CLIENT_ID = "110218343931-a1uctqsv8ir4a9vpl9tsrbctbit87k9g.apps.googleusercontent.com";

  const handleGoogleLoginSuccess = async (response) => {
    const googleToken = response.credential; 
    try {
      setError("");
      const res = await fetch(`${BASE_URL}/login/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.user_id);
        onLoginSuccess(data.role);
      } else if (res.status === 409) {
        onRegisterClick('google-select-role', data); 
      } 
      else {
        setError(data.message || "Error al iniciar sesión con Google.");
      }
    } catch (err) {
      setError("No se pudo completar el inicio de sesión con Google. Revisa tu conexión.");
    }
  };

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID, 
          callback: handleGoogleLoginSuccess,
          auto_select: false,
        });
        
        window.google.accounts.id.renderButton(
          document.getElementById("google-sign-in-button"),
          { theme: "outline", size: "small", type: "standard", shape: "pill", text: "signin_with", locale: "es", width: "100%" }
        );
      }
    };
    if (window.google) initializeGoogle();
    else window.addEventListener("load", initializeGoogle);
    return () => window.removeEventListener("load", initializeGoogle);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setError("Por favor, completa todos los campos y selecciona un rol");
      return;
    }
    try {
      setError("");
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rol: role }), 
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.user_id);
        onLoginSuccess(data.role); 
      } else {
        setError(data.message || "Credenciales inválidas"); 
      }
    } catch {
      setError("Hubo un problema con el servidor al intentar iniciar sesión.");
    }
  };

  const styles = {
    wrapper: {
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      padding: "15px", 
      marginTop: "55px", 
    },
    container: {
      width: "100%",
      maxWidth: "400px", 
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
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '4px',
      margin: '8px 0',
      padding: '0 8px',
      border: '1px solid #ccc',
      transition: 'border-color 0.3s ease-in-out',
    },
    input: {
      flexGrow: 1,
      padding: "8px 0",
      fontSize: "15px",
      borderRadius: "0 4px 4px 0",
      border: "none",
      outline: "none",
      backgroundColor: 'transparent',
      color: 'black',
    },
    icon: {
      color: '#555',
      marginRight: '8px',
      fontSize: '18px',
    },
    fieldset: {
      margin: "12px 0",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      textAlign: "left",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    legend: {
        padding: '0 5px',
        color: '#fff',
        fontWeight: 'bold',
    },
    label: {
      display: "flex",
      alignItems: 'center',
      marginBottom: "8px",
      cursor: "pointer",
      fontWeight: 'normal',
    },
    radioIcon: {
      marginRight: '5px',
      color: '#ebce27ff',
      fontSize: '16px',
    },
    button: {
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "15px",
      fontWeight: 'bold',
      marginTop: "15px",
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.3s ease',
      width: '100%',
    },
    registerButton: {
      flex: 1, 
      padding: "8px 10px", 
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "6px",
      fontSize: "13px", 
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
      transition: 'background-color 0.3s ease',
      minWidth: '0', 
    },
    socialButtonsContainer: { 
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
      gap: "20px",
      marginTop: "15px",
      width: "100%",
    },
    googleButtonDiv: {
      flex: 1, 
      minWidth: '0',
      textAlign: 'center',
      height: '32px', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      color: "#FFC107",
      fontSize: "14px",
      margin: "8px 0",
      fontWeight: 'bold',
    },
    title: { 
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#ffffffff',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.3)',
    }
  };

  return (
  <div style={styles.wrapper}>
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoComplete="email"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="current-password"
            required
          />
        </div>
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>Selecciona un rol:</legend>
          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <FaUserShield style={styles.radioIcon} />
            Administrador
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="cliente"
              checked={role === "cliente"}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <FaUser style={styles.radioIcon} />
            Cliente
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="role"
              value="otros"
              checked={role === "otros"}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <FaBriefcase style={styles.radioIcon} />
            Otros
          </label>
        </fieldset>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          <FaSignInAlt />
          Entrar
        </button>
      </form>

      <div style={styles.socialButtonsContainer}>
        <button
          onClick={onRegisterClick}
          style={styles.registerButton}
        >
          <FaUserPlus style={{ fontSize: "14px" }} />
          Registrarse
        </button>

        <div
          id="google-sign-in-button"
          style={styles.googleButtonDiv}
        ></div>
      </div>
    </div>
  </div>
)};

export default Login;
