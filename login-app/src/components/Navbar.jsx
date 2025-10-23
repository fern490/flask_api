import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/eventos", label: "Eventos" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contactenos", label: "Contáctenos" },
    { path: "/trabaja-con-nosotros", label: "Trabajá con Nosotros" },
  ];

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "60px",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "40px",
      color: "white",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.95rem",
      letterSpacing: "0.5px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      zIndex: 1000,
    },
    link: {
      color: "#ddd",
      textDecoration: "none",
      transition: "color 0.3s ease, transform 0.2s ease",
      position: "relative",
    },
    active: {
      color: "#27ae60",
    },
    underline: {
      content: "''",
      position: "absolute",
      left: 0,
      bottom: "-5px",
      height: "2px",
      width: "100%",
      backgroundColor: "#27ae60",
      transform: "scaleX(0)",
      transition: "transform 0.3s ease",
    },
  };

  return (
    <nav style={styles.navbar}>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          style={{
            ...styles.link,
            ...(location.pathname === link.path ? styles.active : {}),
          }}
          onMouseEnter={(e) =>
            (e.target.style.color = "#27ae60")
          }
          onMouseLeave={(e) =>
            (e.target.style.color =
              location.pathname === link.path ? "#27ae60" : "#ddd")
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;