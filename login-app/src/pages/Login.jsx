import React, { useState, useEffect, useCallback } from "react";
import {
  FaUserShield,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Login = ({ onLoginSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";
  const GOOGLE_CLIENT_ID =
    "110218343931-a1uctqsv8ir4a9vpl9tsrbctbit87k9g.apps.googleusercontent.com";

  const handleGoogleLoginSuccess = useCallback(
    async (response) => {
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
          onRegisterClick("google-select-role", data);
        } else {
          setError(data.message || "Error al iniciar sesión con Google.");
        }
      } catch {
        setError(
          "No se pudo completar el inicio de sesión con Google. Revisa tu conexión."
        );
      }
    },
    [onLoginSuccess, onRegisterClick]
  );

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
          {
            theme: "outline",
            size: "small",
            type: "standard",
            shape: "pill",
            text: "signin_with",
            locale: "es",
            width: "100%",
          }
        );
      }
    };
    if (window.google) initializeGoogle();
    else window.addEventListener("load", initializeGoogle);
    return () => window.removeEventListener("load", initializeGoogle);
  }, [handleGoogleLoginSuccess]);

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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 20px",
    background: "transparent",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  container: {
    width: "100%",
    maxWidth: "360px",
    padding: "25px 20px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.7)",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    color: "#fff",
    marginTop: "11px",
  },

  title: {
    fontSize: "1.5rem",
    marginBottom: "18px",
    fontWeight: "600",
    color: "#fff",
    textShadow: "0 0 6px #fff, 0 0 10px #00eaff",
    letterSpacing: "1px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
    margin: "8px 0",
    padding: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "all 0.3s ease",
  },

  input: {
    flexGrow: 1,
    padding: "6px",
    fontSize: "14px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "#fff",
  },

  icon: {
    color: "#00eaff",
    marginRight: "6px",
    fontSize: "16px",
  },

  fieldset: {
    margin: "12px 0",
    padding: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "10px",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  legend: {
    padding: "0 5px",
    color: "#fff",
    fontWeight: "bold",
  },

  label: {
    display: "flex",
    alignItems: "center",
    marginBottom: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },

  radioIcon: {
    marginRight: "4px",
    color: "#ebce27ff",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    background: "linear-gradient(90deg, #00eaff, #0077ff)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  },

  registerButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(90deg, #6a11cb, #2575fc)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px",
    transition: "all 0.3s ease",
    minWidth: "0",
  },

  socialButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
    width: "100%",
  },

  googleButtonDiv: {
    flex: 1,
    minWidth: "0",
    textAlign: "center",
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    color: "#ffcc00",
    fontSize: "13px",
    margin: "8px 0",
    fontWeight: "bold",
    textShadow: "0 0 4px #000",
  },
};

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="text"
              placeholder="Correo electronico o nombre de usuario"
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
          <button onClick={onRegisterClick} style={styles.registerButton}>
            <FaUserPlus style={{ fontSize: "14px" }} />
            Registrarse
          </button>
          <div id="google-sign-in-button" style={styles.googleButtonDiv}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
