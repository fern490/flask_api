import React from "react";

const Inicio = () => {
  const styles = {
    container: {
      width: "100%",
      overflowX: "hidden",
      fontFamily: "'Arial', sans-serif",
      color: "#fff",
      backgroundColor: "#000",
    },

    heroSection: {
      width: "100vw",
      height: "80vh",
      backgroundImage:
        "url('Gemini_Generated_Image_oty5shoty5shoty5.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 0,
    },

    content: {
      position: "relative",
      zIndex: 1,
      padding: "20px",
    },

    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "12px",
      letterSpacing: "-0.5px",
    },

    subtitle: {
      fontSize: "1.1rem",
      maxWidth: "700px",
      lineHeight: "1.6",
      marginLeft: "30px",
    },

    empresasSection: {
      backgroundColor: "#111",
      textAlign: "center",
      padding: "40px 0",
      overflow: "hidden",
    },

    empresasTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "25px",
    },

    logosContainer: {
      display: "flex",
      gap: "50px",
      width: "200%",
      animation: "scroll 25s linear infinite",
    },

    logo: {
      height: "80px",
      objectFit: "contain",
      filter: "brightness(0) invert(1)",
    },

    "@keyframes scroll": {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
  };

  return (
    <div style={styles.container}>
      {/* IMAGEN PRINCIPAL */}
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <h1 style={styles.title}>EL ARTE DE CREAR MOMENTOS ÚNICOS</h1>
          <p style={styles.subtitle}>
            DESCUBRÍ LA MAGIA DE LOS EVENTOS EN FESTIUM EVENTOS.<br></br>
            DONDE CADA DETALLE ESTÁ PENSADO PARA EMOCIONAR.
          </p>
        </div>
      </section>

      

      {/* EMPRESAS */}
      <section style={styles.empresasSection}>
        <h2 style={styles.empresasTitle}>
          Algunas empresas que confían en nosotros:
        </h2>

        <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <div style={styles.logosContainer}>
            <img
              src=""
              alt="Logo 1"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 2"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 3"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 4"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 5"
              style={styles.logo}
            />
            {/* Duplicamos los logos para efecto infinito */}
            <img
              src=""
              alt="Logo 1b"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 2b"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 3b"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 4b"
              style={styles.logo}
            />
            <img
              src=""
              alt="Logo 5b"
              style={styles.logo}
            />
          </div>
        </div>
      </section>

      {/* CSS inline */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Inicio;