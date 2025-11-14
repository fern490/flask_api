import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import OtrosDashboard from "./pages/OtrosDashboard";
import CrearEvento from "./pages/CrearEvento";
import Contactenos from "./pages/Contactenos";
import Register from "./pages/Register";
import TrabajaConNosotros from "./pages/TrabajaConNosotros";
import Inicio from "./pages/Inicio";
import GoogleRoleSelector from "./pages/GoogleRoleSelector";

function App() {
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);
  const navigate = useNavigate();
  const location = useLocation();

  // 1️⃣ Sincronizar estado con sessionStorage en carga
  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole) setUserRole(storedRole);
  }, []);

  // 2️⃣ Redirección automática después de login
  useEffect(() => {
    if (userRole && location.pathname === '/login') {
      const path = getDashboardPath(userRole);
      if (path !== '/login') navigate(path, { replace: true });
    }
  }, [userRole, location.pathname, navigate]);

  const contactButtonHiddenRoutes = [
    "/admin-dashboard",
    "/cliente-dashboard",
    "/Otros-dashboard",
    "/seleccionar-rol-google",
  ];

  const showButtons = !contactButtonHiddenRoutes.includes(location.pathname);

  const getDashboardPath = (role) => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'cliente') return '/cliente-dashboard';
    if (role === 'otros') return '/Otros-dashboard';
    return '/login';
  };

  const handleLoginSuccess = (role) => {
    sessionStorage.setItem("userRole", role);
    setUserRole(role); // useEffect se encargará de redirigir
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    setUserRole(null);
    navigate("/login");
  };

  const handleRegisterClick = (type, data) => {
    if (type === 'google-select-role') {
      sessionStorage.setItem('googleRegisterData', JSON.stringify(data));
      navigate("/seleccionar-rol-google");
    } else {
      navigate("/register");
    }
  };

  const styles = {
    appContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      minHeight: "100vh",
      backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdRiuEpxYquiiW-1dvYyOSuGuuHL6kvxehw&s)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      paddingBottom: "20px",
    },
    topBar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "60px",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      color: "white",
      fontSize: "22px",
      fontWeight: "bold",
      textDecoration: "none",
      gap: "8px",
      letterSpacing: "1px",
    },
    logo: {
      width: "35px",
      height: "35px",
      backgroundColor: "#8E24AA",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      color: "#FFC107",
      fontWeight: "bolder",
      border: "3px solid #FFC107",
      transform: "rotate(20deg)",
      fontFamily: "Oswald, sans-serif",
    },
    sectionContainer: {
      display: "flex",
      gap: "15px",
      justifyContent: "flex-end",
      minWidth: "fit-content",
      flexWrap: "nowrap",
      paddingRight: "30px",
    },
    section: {
      backgroundColor: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "8px",
      padding: "10px 22px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(8px)",
      whiteSpace: "nowrap",
      textAlign: "center",
    },
    sectionHover: {
      transform: "scale(1.08)",
      backgroundColor: "rgba(255,255,255,0.25)",
    },
  };

  const SectionButton = ({ to, label }) => {
    const [hover, setHover] = useState(false);
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <div
          style={{
            ...styles.section,
            ...(hover ? styles.sectionHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {label}
        </div>
      </Link>
    );
  };

  return (
    <div style={styles.appContainer}>
      {showButtons && (
        <div style={styles.topBar}>
          <Link to="/login" style={styles.logoContainer}>
            <div style={styles.logo}>F</div>
            FESTIUM
          </Link>
          <div style={styles.sectionContainer}>
            <SectionButton to="/inicio" label="Inicio" />
            <SectionButton to="/contactenos" label="Contáctenos" />
            <SectionButton to="/trabaja-con-nosotros" label="Trabajá con Nosotros" />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />}
        />
        <Route
          path="/admin-dashboard"
          element={userRole === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to={getDashboardPath(userRole)} replace />}
        />
        <Route
          path="/cliente-dashboard"
          element={userRole === "cliente" ? <ClienteDashboard onLogout={handleLogout} /> : <Navigate to={getDashboardPath(userRole)} replace />}
        />
        <Route
          path="/Otros-dashboard"
          element={userRole === "otros" ? <OtrosDashboard onLogout={handleLogout} /> : <Navigate to={getDashboardPath(userRole)} replace />}
        />
        <Route
          path="/crear-evento"
          element={userRole === "admin" ? <CrearEvento /> : <Navigate to="/login" replace />}
        />
        <Route path="/contactenos" element={<Contactenos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
        <Route path="/seleccionar-rol-google" element={<GoogleRoleSelector onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to={getDashboardPath(userRole)} replace />} />
      </Routes>
    </div>
  );
}

export default App;
