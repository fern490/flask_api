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

  const username = userData ? userData.email.split('@')[0] : "";

  useEffect(() => {
    const storedData = sessionStorage.getItem('googleRegisterData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/login");
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
          rol: role,
          password: uniqueDummyPassword,
          usuario: username,
          fecha_nacimiento: '2000-01-01', 
          genero: 'Otro'
        }),
      });

      if (!registerRes.ok) {
        const data = await registerRes.json();
        setError(data.message || "Error al registrar el usuario.");
        setLoading(false);
        return;
      }

      const loginRes = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: uniqueDummyPassword,
          rol: role
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        sessionStorage.removeItem('googleRegisterData');
        
        localStorage.setItem("token", loginData.token); 
        localStorage.setItem("userRole", loginData.role);
        localStorage.setItem("userId", loginData.user_id);

        onLoginSuccess(loginData.role); 
      } else {
        setError("Error al iniciar sesión después del registro. Intenta el login tradicional.");
      }

    } catch {
      setError("Error de conexión al registrar/loguear.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return null; // <=== Si no hay datos, tampoco renderiza
  }

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
                    style={{...styles.radioLabel, ...(role === r ? styles.radioChecked : {})}}>
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
        </form>
      </div>
    </div>
  );
};

export default GoogleRoleSelector;
