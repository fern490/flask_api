import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import OtrosDashboard from "./pages/OtrosDashboard";
import CrearEvento from "./pages/CrearEvento";
import Contactenos from "./pages/Contactenos";
import Register from "./pages/Register";
import TrabajaConNosotros from "./pages/TrabajaConNosotros";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
  const navigate = useNavigate();
  const location = useLocation();

  const contactButtonHiddenRoutes = [
    "/contactenos",
    "/trabaja-con-nosotros",
    "/admin-dashboard",
    "/cliente-dashboard",
    "/home",
    "/crear-evento",
  ];

  const showButtons = !contactButtonHiddenRoutes.includes(location.pathname);

  const handleLoginSuccess = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);

    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "cliente") navigate("/cliente-dashboard");
    else if (role === "otros") navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/login");
  };

  const handleRegisterClick = () => navigate("/register");

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
        fontSize: "20px",
        fontWeight: "bold",
        textDecoration: "none",
        gap: "10px",
    },
    logo: {
        width: "30px",
        height: "30px",
        backgroundColor: "#00796B",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "#FF9800",
        fontWeight: "bolder",
        border: "2px solid #FF9800",
    },
    sectionContainer: {
      display: "flex",
      gap: "15px",
    },
    section: {
      backgroundColor: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "8px",
      padding: "10px 18px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(8px)",
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
      {}
      {showButtons && (
        <div style={styles.topBar}>
            {}
            <Link to="/login" style={styles.logoContainer}>
                <div style={styles.logo}>S</div>
                SYNAPSIS
            </Link>

          <div style={styles.sectionContainer}>
            <SectionButton to="/contactenos" label="Contáctenos" />
            <SectionButton to="/trabaja-con-nosotros" label="Trabajá con Nosotros" />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />}
        />
        <Route
          path="/admin-dashboard"
          element={userRole === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cliente-dashboard"
          element={userRole === "cliente" ? <ClienteDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/home"
          element={userRole === "otros" ? <OtrosDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/crear-evento"
          element={userRole === "admin" ? <CrearEvento /> : <Navigate to="/login" replace />}
        />
        <Route path="/contactenos" element={<Contactenos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
