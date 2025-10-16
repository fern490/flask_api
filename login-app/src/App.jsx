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

<<<<<<< HEAD
=======
  // Mostrar botones solo si la ruta actual NO está en la lista de rutas a ocultar
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdRiuEpxYquiiW-1dvYyOSuGuuHL6kvxehw&s)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
    },
<<<<<<< HEAD
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
      justifyContent: "flex-end",
      paddingRight: "30px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
=======
    buttonContainer: {
      position: "absolute",
      top: "20px",
      right: "20px",
      display: "flex",
      gap: "10px",
      zIndex: 10,
    },
    contactButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    workButton: {
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
      {/* Barra negra superior */}
      {showButtons && (
        <div style={styles.topBar}>
          <div style={styles.sectionContainer}>
            <SectionButton to="/contactenos" label="Contáctenos" />
            <SectionButton to="/trabaja-con-nosotros" label="Trabajá con Nosotros" />
          </div>
=======
      {/* Botones de acceso rápido */}
      {showButtons && (
        <div style={styles.buttonContainer}>
          <Link to="/contactenos">
            <button style={styles.contactButton}>Contáctenos</button>
          </Link>

          <Link to="/trabaja-con-nosotros">
            <button style={styles.workButton}>Trabajá con Nosotros</button>
          </Link>
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
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
<<<<<<< HEAD
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
=======

        {/* Ruta para Trabajá con Nosotros */}
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />

>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
