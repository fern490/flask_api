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
      backgroundImage: "url('Gemini_Generated_Image_oty5shoty5shoty5.jpg')",
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
      marginTop: "50px",
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
      margin: "20px auto 0 auto",
    },

    eleganceSection: {
      backgroundColor: "#111",
      textAlign: "center",
      padding: "1px 20px 40px 20px",
    },

    eleganceText: {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      maxWidth: "900px",
      margin: "0 auto",
    },

    eleganceTitle: {
      fontWeight: "bold",
      fontSize: "1.8rem",
      marginBottom: "10px",
      letterSpacing: "-0.5px",
    },

    highlightSubtitle: {
      fontSize: "1.50rem",
      color: "#848484ff",
      marginTop: "-5px",
      fontWeight: "500",
    },

    eleganceHighlight: {
      fontSize: "1.6rem",
      color: "#907f72ff",
      fontWeight: "bold",
      marginBottom: "10px",
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

    logosScrollWrapper: {
      display: "flex",
      justifyContent: "flex-start",
      overflow: "hidden",
      width: "100%",
    },

    logosContainer: {
      display: "flex",
      gap: "40px",
      alignItems: "center",
      width: "max-content",
      animation: "scroll 20s linear infinite",
    },

    logo: {
      height: "170px",
      objectFit: "contain",
      filter: "invert(1)",
    },

    eleganceDescription: {
      fontSize: "1.1rem",
      lineHeight: "1.4",
      color: "#fff",
      marginTop: "10px",
      maxWidth: "800px",
      margin: "10px auto 0 auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* IMAGEN PRINCIPAL */}
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <h1 style={styles.title}>EL ARTE DE CREAR MOMENTOS ÚNICOS</h1>
          <div style={styles.subtitle}>
            <p>
              DESCUBRÍ LA MAGIA DE LOS EVENTOS EN FESTIUM EVENTOS.<br />
              DONDE CADA DETALLE ESTÁ PENSADO PARA EMOCIONAR.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE ELEGANCIA Y MODERNIDAD */}
      <section style={styles.eleganceSection}>
        <div style={styles.eleganceText}>
          <h2 style={styles.eleganceTitle}>ELEGANCIA Y MODERNIDAD</h2>
          <p style={styles.highlightSubtitle}>El lugar ideal para cada evento.</p>
          <p style={styles.eleganceDescription}>
            Un espacio elegante y moderno, perfecto para eventos de todas las escalas,
            desde íntimas reuniones hasta grandes celebraciones. <br /> Nuestro salón multifuncional
            ofrece un servicio excepcional y profesional, asegurando que cada ocasión sea
            una experiencia memorable y llena de distinción.
          </p>
        </div>
      </section>

      {/* EMPRESAS */}
      <section style={styles.empresasSection}>
        <h2 style={styles.empresasTitle}>
          Algunas empresas que confían en nosotros:
        </h2>

        <div style={styles.logosScrollWrapper}>
          <div style={styles.logosContainer}>
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D195633244267251&f=1&nofb=1&ipt=558a5bd549fdb009bc4165f3b27e5ee2eaa267c738f50e76a31ce31b78858d56" alt=""/>
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FC4E0BAQEXT36fTUK5dA%2Fcompany-logo_200_200%2Fcompany-logo_200_200%2F0%2F1631305920298%3Fe%3D2147483647%26v%3Dbeta%26t%3D7HU4L1cIct-k9HCma-J5ylCpbd-hQN2hDarJdfvybm0&f=1&nofb=1&ipt=c2e69f6207edc1eba8cb1a6dc065a4b49c90cddff049c55e947cd51f6f3cdd9c" alt=""/>
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1034089715084970&f=1&nofb=1&ipt=df9fa7116aff93e5ab4fc52ed254534ab12c3a07fd42901512cdfd74ae8e995e" alt=""/>
            <img style={styles.logo} src="https://www.celebrityfiestas.com.ar/wp-content/uploads/2019/06/logo-celebrity-2019-redes-cuadrado.jpg" alt=""/>
            <img style={styles.logo} src="https://images.openai.com/static-rsc-1/s_NIV07HahmxsxKIk20sxCcZyLucSFaJ2qo7Jc8DesxzEgRpay30fJLaEAmMW3yY6Ze9G9Ks8YCDzV4SkYJkuD60YdWH3Y8hdP4NZjvZn46Mvd7MmIzKR9SnzMhfD8_xogqrGaBIlSGJbI5ekutJPA" alt=""/>
            {/* Repetir para scroll continuo */}
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D195633244267251&f=1&nofb=1&ipt=558a5bd549fdb009bc4165f3b27e5ee2eaa267c738f50e76a31ce31b78858d56" alt=""/>
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FC4E0BAQEXT36fTUK5dA%2Fcompany-logo_200_200%2Fcompany-logo_200_200%2F0%2F1631305920298%3Fe%3D2147483647%26v%3Dbeta%26t%3D7HU4L1cIct-k9HCma-J5ylCpbd-hQN2hDarJdfvybm0&f=1&nofb=1&ipt=c2e69f6207edc1eba8cb1a6dc065a4b49c90cddff049c55e947cd51f6f3cdd9c" alt=""/>
            <img style={styles.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1034089715084970&f=1&nofb=1&ipt=df9fa7116aff93e5ab4fc52ed254534ab12c3a07fd42901512cdfd74ae8e995e" alt=""/>
            <img style={styles.logo} src="https://www.celebrityfiestas.com.ar/wp-content/uploads/2019/06/logo-celebrity-2019-redes-cuadrado.jpg" alt=""/>
            <img style={styles.logo} src="https://images.openai.com/static-rsc-1/s_NIV07HahmxsxKIk20sxCcZyLucSFaJ2qo7Jc8DesxzEgRpay30fJLaEAmMW3yY6Ze9G9Ks8YCDzV4SkYJkuD60YdWH3Y8hdP4NZjvZn46Mvd7MmIzKR9SnzMhfD8_xogqrGaBIlSGJbI5ekutJPA" alt=""/>
          </div>
        </div>
      </section>

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
