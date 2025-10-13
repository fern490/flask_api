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
    "/home", // OtrosDashboard
    "/crear-evento",
  ];

  // Muestra los botones solo si la ruta actual NO está en la lista de rutas a ocultar
  const showButtons = !contactButtonHiddenRoutes.includes(location.pathname);

  const handleLoginSuccess = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);

    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "cliente") {
      navigate("/cliente-dashboard");
    } else if (role === "otros") {
      navigate("/home");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

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
    },
  };

  return (
    <div style={styles.appContainer}>
      {/* Botones de acceso rápido */}
      {showButtons && (
        <div style={styles.buttonContainer}>
          <Link to="/contactenos">
            <button style={styles.contactButton}>Contáctenos</button>
          </Link>
          <Link to="/trabaja-con-nosotros">
            <button style={styles.workButton}>Trabajá con Nosotros</button>
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={handleRegisterClick}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/cliente-dashboard"
          element={
            userRole === "cliente" ? (
              <ClienteDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            userRole === "otros" ? (
              <OtrosDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/crear-evento"
          element={
            userRole === "admin" ? (
              <CrearEvento />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/contactenos" element={<Contactenos />} />
        <Route path="/register" element={<Register />} />

        {/* Nueva ruta para "Trabajá con Nosotros" */}
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
