import React from "react";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import Home from "./pages/Home";
import CrearEvento from "./pages/CrearEvento";
import Contactenos from "./pages/Contactenos";

function App() {
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
    contactButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "10px 15px",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.appContainer}>
      <Link to="/contactenos" style={styles.contactButton}>
        Contáctenos
      </Link>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/cliente-dashboard" element={<ClienteDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crear-evento" element={<CrearEvento />} />
        <Route path="/contactenos" element={<Contactenos />} />
      </Routes>
    </div>
  );
}

export default App;
