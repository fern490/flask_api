import React, { useState } from "react";
import { FaUserShield, FaUser, FaBriefcase, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

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
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.user_id);

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
<<<<<<< HEAD
      padding: "20px", 
      margin: "0 20px", 
>>>>>>> f13109f0ee2f7941899bd32e75f388465aa488db
=======
      padding: "15px", 
      marginTop: "55px", 
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
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
<<<<<<< HEAD
      margin: "10px 0",
      padding: "10px 12px",
      fontSize: "15px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      outline: "none",
      transition: "0.3s ease",
=======
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
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
    },

    fieldset: {
      margin: "12px 0",
      padding: "10px",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "8px",
      textAlign: "left",
<<<<<<< HEAD
      color: "#ddd",
=======
      backgroundColor: "rgba(0, 0, 0, 0.2)",
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
    },

    label: {
      display: "flex",
      alignItems: 'center',
      marginBottom: "8px",
      cursor: "pointer",
<<<<<<< HEAD
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
=======
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
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
    },

    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 0 10px rgba(106,17,203,0.6)",
    },

    registerButton: {
<<<<<<< HEAD
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
=======
      padding: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: 'bold',
      marginTop: "10px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.3s ease',
    },

    error: {
      color: "#FFC107",
      fontSize: "14px",
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
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
  
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredRegister, setHoveredRegister] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
<<<<<<< HEAD

=======
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Campo de Email */}
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

          {/* Campo de Contraseña */}
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
            <legend>Selecciona un rol:</legend>

            {/* Rol: Administrador */}
            <label style={styles.label}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
<<<<<<< HEAD
              />{" "}
=======
                style={{ marginRight: '8px' }}
              />
              <FaUserShield style={styles.radioIcon} />
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
              Administrador
            </label>

            {/* Rol: Cliente */}
            <label style={styles.label}>
              <input
                type="radio"
                name="role"
                value="cliente"
                checked={role === "cliente"}
                onChange={(e) => setRole(e.target.value)}
<<<<<<< HEAD
              />{" "}
=======
                style={{ marginRight: '8px' }}
              />
              <FaUser style={styles.radioIcon} />
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
              Cliente
            </label>

            {/* Rol: Otros */}
            <label style={styles.label}>
              <input
                type="radio"
                name="role"
                value="otros"
                checked={role === "otros"}
                onChange={(e) => setRole(e.target.value)}
<<<<<<< HEAD
              />{" "}
=======
                style={{ marginRight: '8px' }}
              />
              <FaBriefcase style={styles.radioIcon} />
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
              Otros
            </label>
          </fieldset>

          {error && <p style={styles.error}>{error}</p>}

<<<<<<< HEAD
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hoveredButton ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
=======
          <button type="submit" style={styles.button}>
            <FaSignInAlt />
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
            Entrar
          </button>
        </form>

<<<<<<< HEAD
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
=======
        <button onClick={onRegisterClick} style={styles.registerButton}>
          <FaUserPlus />
>>>>>>> 4f6821d953e275c06ac88329da07c045e28a7a91
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;