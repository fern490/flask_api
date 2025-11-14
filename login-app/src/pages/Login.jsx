import React, { useState, useEffect, useCallback } from "react";
import { FaUserShield, FaUser, FaBriefcase, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaGlobeAmericas, FaRocket, FaRegLightbulb,} from "react-icons/fa";

const Login = ({ onLoginSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";
  const GOOGLE_CLIENT_ID = "110218343931-a1uctqsv8ir4a9vpl9tsrbctbit87k9g.apps.googleusercontent.com";

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflowY;
    document.body.style.overflowY = "scroll";
    return () => {
      document.body.style.overflowY = originalStyle;
    };
  }, []);

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
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("userRole", data.rol);
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
            size: "medium",
            type: "standard",
            shape: "square",
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
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userRole", role); // CRÍTICO: Este es el rol
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
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px 0 20px",
      fontFamily: "'Poppins', sans-serif",
      minHeight: "120vh",
      background: "transparent",
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
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.12)",
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
      textShadow: "0 0 6px #fff, 0 0 10px #07565dff",
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
      width: "100%",
      minHeight: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    },
    error: {
      color: "#ffcc00",
      fontSize: "13px",
      margin: "8px 0",
      fontWeight: "bold",
      textShadow: "0 0 4px #000",
    },

    infoSection: {
      marginTop: "40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "900px",
      padding: "0 10px",
    },
    cardWrapper: {
      position: "relative",
      borderRadius: "18px",
      padding: "2px",
      background: "linear-gradient(135deg, rgba(0,255,255,0.6), rgba(0,119,255,0.4))",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    card: {
      background: "rgba(0, 0, 0, 0.75)",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      color: "#fff",
      backdropFilter: "blur(8px)",
      height: "100%",
    },
    cardIcon: {
      fontSize: "28px",
      marginBottom: "8px",
      color: "#00eaff",
    },
    cardTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "6px",
    },
    cardText: {
      fontSize: "0.85rem",
      color: "#ccc",
      lineHeight: "1.4",
    },

    footer: {
      marginTop: "50px",
      width: "100%",
      background: "rgba(0,0,0,0.85)",
      color: "#bbb",
      textAlign: "center",
      padding: "15px 0",
      fontSize: "0.9rem",
      letterSpacing: "0.5px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    },
  };

  const infoCards = [
    {
      icon: <FaGlobeAmericas />,
      title: "Conexión Global",
      text: "Accede desde cualquier lugar del mundo con seguridad y velocidad.",
    },
    {
      icon: <FaRocket />,
      title: "Rendimiento Rápido",
      text: "Disfruta de una experiencia optimizada y fluida en todo momento.",
    },
    {
      icon: <FaRegLightbulb />,
      title: "Innovación Constante",
      text: "Nuestro sistema evoluciona contigo, integrando las últimas tecnologías.",
    },
  ];

  return (
    <div style={styles.wrapper}>
      {/* FORMULARIO */}
      <div style={styles.container}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="text"
              placeholder="Correo electrónico o nombre de usuario"
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
              <FaUserShield style={styles.radioIcon} /> Administrador
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
              <FaUser style={styles.radioIcon} /> Cliente
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
              <FaBriefcase style={styles.radioIcon} /> Otros
            </label>
          </fieldset>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            <FaSignInAlt /> Entrar
          </button>
        </form>

        <div style={styles.socialButtonsContainer}>
          <button onClick={onRegisterClick} style={styles.registerButton}>
            <FaUserPlus style={{ fontSize: "14px" }} /> Registrarse
          </button>
          <div id="google-sign-in-button" style={styles.googleButtonDiv}></div>
        </div>
      </div>

      {/* 🔷 Tarjetas */}
      <div style={styles.infoSection}>
        {infoCards.map((card, index) => (
          <div
            key={index}
            style={styles.cardWrapper}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.card}>
              <div style={styles.cardIcon}>{card.icon}</div>
              <div style={styles.cardTitle}>{card.title}</div>
              <div style={styles.cardText}>{card.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ⚫ Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} FESTIUM. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;
