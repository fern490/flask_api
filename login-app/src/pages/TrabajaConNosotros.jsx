import React, { useState } from "react";

const TrabajaConNosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    experiencia: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("¡Tu postulación fue enviada correctamente!");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          especialidad: "",
          experiencia: "",
        });
      } else {
        setMensaje("Hubo un error al enviar tu postulación.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  const styles = {
    background: {
      backgroundImage:
        "url('https://constantinoeventos.com.ar/wp-content/uploads/2019/11/Fiesta-de-fin-de-a%C3%B1o-empresa-300x225.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "420px",
      padding: "25px",
      borderRadius: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      height: "100px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      resize: "vertical",
      fontSize: "15px",
      marginBottom: "15px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
    message: {
      marginTop: "15px",
      color: "#2ecc71",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.title}>Trabajá con Nosotros</h1>
        <p style={{ marginBottom: "20px" }}>
          Si ofrecés servicios para eventos (DJ, fotografía, decoración, catering...), ¡completá el formulario y sumate!
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            style={styles.input}
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono o WhatsApp"
            style={styles.input}
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad (DJ, fotógrafo, decorador...)"
            style={styles.input}
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
          <textarea
            name="experiencia"
            placeholder="Contanos brevemente tu experiencia o qué ofrecés..."
            style={styles.textarea}
            value={formData.experiencia}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" style={styles.button}>
            Enviar Postulación
          </button>
        </form>

        {mensaje && <p style={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default TrabajaConNosotros;
