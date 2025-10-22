import React from "react";

const Inicio = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      backgroundColor: "#000",
      overflowX: "hidden",
    },
    heroSection: {
      position: "relative",
      width: "100%",
      height: "90vh",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1400&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    heroText: {
      position: "relative",
      zIndex: 2,
      fontSize: "36px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    subText: {
      position: "relative",
      zIndex: 2,
      fontSize: "16px",
      color: "#ddd",
      marginTop: "10px",
    },
    videoButton: {
      position: "relative",
      zIndex: 2,
      marginTop: "30px",
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.2)",
      border: "2px solid #fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "0.3s",
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: "14px solid #fff",
      borderTop: "10px solid transparent",
      borderBottom: "10px solid transparent",
      marginLeft: "4px",
    },
    infoSection: {
      backgroundColor: "#000",
      textAlign: "center",
      padding: "60px 20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#fff",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#bbb",
      marginBottom: "20px",
    },
    paragraph: {
      color: "#ccc",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontSize: "15px",
    },
    logosSection: {
      backgroundColor: "#fff",
      color: "#000",
      textAlign: "center",
      padding: "40px 0",
    },
    logosTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    logosContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "50px",
    },
    logo: {
      height: "40px",
      opacity: 0.8,
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sección principal con imagen de fondo */}
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <h1 style={styles.heroText}>EL ARTE DE CREAR MOMENTOS ÚNICOS</h1>
        <p style={styles.subText}>
          DESCUBRÍ LA MAGIA DE LOS EVENTOS EN FESTIUM <br />
          DONDE CADA DETALLE ESTÁ PENSADO PARA EMOCIONAR.
        </p>
        <div style={styles.videoButton}>
          <div style={styles.triangle}></div>
        </div>
      </section>

      {/* Sección Elegancia y Modernidad */}
      <section style={styles.infoSection}>
        <h2 style={styles.title}>ELEGANCIA Y MODERNIDAD</h2>
        <p style={styles.subtitle}>El lugar ideal para cada evento</p>
        <p style={styles.paragraph}>
          Un espacio elegante y moderno, perfecto para eventos de todas las
          escalas, desde íntimas reuniones hasta grandes celebraciones. FESTIUM
          ofrece un servicio excepcional y profesional, asegurando que cada
          ocasión sea una experiencia memorable y llena de distinción.
        </p>
      </section>

      {/* Logos de empresas o confianza */}
      <section style={styles.logosSection}>
        <h3 style={styles.logosTitle}>
          Algunas empresas que confían en nosotros:
        </h3>
        <div style={styles.logosContainer}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg"
            alt="Logo 1"
            style={styles.logo}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
            alt="Logo 2"
            style={styles.logo}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
            alt="Logo 3"
            style={styles.logo}
          />
        </div>
      </section>
    </div>
  );
};

export default Inicio;
