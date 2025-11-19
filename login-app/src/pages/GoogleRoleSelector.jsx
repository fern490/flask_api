import React, { useState, useEffect } from "react";
import { FaUserShield, FaUser, FaBriefcase, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const GoogleRoleSelector = ({ onLoginSuccess }) => {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:5000";
  
  const uniqueDummyPassword = "google_user_temp_pwd_12345";

  const username = userData ? (userData.email ? userData.email.split('@')[0] : "") : "";

  const getDashboardPath = (role) => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'cliente') return '/cliente-dashboard';
    if (role === 'otros') return '/otros-dashboard';
    return '/login';
  };

  const handleLoginSuccessLocal = (role) => {
    onLoginSuccess(role);
    const path = getDashboardPath(role);
    navigate(path, { replace: true });
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('googleRegisterData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Por favor, selecciona un rol para continuar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const registerRes = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          fecha_nacimiento: userData.fecha_nacimiento || "2000-01-01",
          genero: userData.genero || "N/A",
          usuario: username,
          password: uniqueDummyPassword,
          rol: role,
        }),
      });

      // Si ya existe (409) o se creó (201), proceder a login
      if (registerRes.ok || registerRes.status === 409) {
        const finalLoginRes = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            password: uniqueDummyPassword,
            rol: role
          }),
        });

        const loginData = await finalLoginRes.json();

        if (finalLoginRes.ok) {
          const tokenVal = loginData.token;
          const roleVal = loginData.role || loginData.rol || role;
          const userIdVal = loginData.user_id || loginData.userId;

          if (tokenVal) sessionStorage.setItem("token", tokenVal);
          if (userIdVal) sessionStorage.setItem("userId", userIdVal);
          if (roleVal) sessionStorage.setItem("userRole", roleVal);

          sessionStorage.removeItem('googleRegisterData');

          handleLoginSuccessLocal(roleVal);
        } else {
          setError(loginData.message || "Error al iniciar sesión.");
        }
      } else {
        const errorData = await registerRes.json();
        setError(errorData.mensaje || "Error desconocido al registrar usuario.");
      }
    } catch (err) {
      console.error("Error en handleRegistration:", err);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    modalContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#425e62ff',
      padding: '30px',
      borderRadius: '10px',
      maxWidth: '350px',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    },
    button: {
      width: '100%',
      padding: '12px 20px',
      marginTop: '15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      opacity: loading ? 0.7 : 1,
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      margin: '8px 0',
      backgroundColor: '#5a787c',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    radioChecked: {
      backgroundColor: '#00bcd4',
    }
  };

  if (!userData) {
    return (
      <div style={styles.modalContainer}>
        <div style={styles.modalContent}>
          <FaSpinner className="spin" size={30} />
          <p>Cargando datos de usuario...</p>
          <style>{`
            .spin { animation: spin 1s linear infinite; }
            @keyframes spin { 
              0% { transform: rotate(0deg); } 
              100% { transform: rotate(360deg); } 
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <FaCheckCircle size={30} color="#4CAF50" style={{ marginBottom: '10px' }} />
        <h2>¡Bienvenido(a), {userData.nombre}!</h2>
        <p>Selecciona tu rol para finalizar el registro y acceder.</p>

        <form onSubmit={handleRegistration}>
          <div style={{ margin: "20px 0" }}>
            {['admin', 'cliente', 'otros'].map(r => (
              <label
                key={r}
                style={{ ...styles.radioLabel, ...(role === r ? styles.radioChecked : {}) }}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ display: 'none' }}
                  disabled={loading}
                />
                {r === 'admin' && <FaUserShield style={{ marginRight: '10px' }} />}
                {r === 'cliente' && <FaUser style={{ marginRight: '10px' }} />}
                {r === 'otros' && <FaBriefcase style={{ marginRight: '10px' }} />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </label>
            ))}
          </div>

          {error && <p style={{ color: '#FFC107', fontSize: '14px', margin: '8px 0' }}>{error}</p>}

          <button
            type="submit"
            style={styles.button}
            disabled={loading || !role}
          >
            {loading ? <FaSpinner className="spin" /> : 'Finalizar y Acceder'}
          </button>
          <style>{`
            .spin { animation: spin 1s linear infinite; }
          `}</style>
        </form>
      </div>
    </div>
  );
};

export default GoogleRoleSelector;
