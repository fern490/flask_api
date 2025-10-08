import React, { useState } from "react";

const CrearEvento = () => {
  const [nombreEvento, setNombreEvento] = useState("");
  const [fecha, setFecha] = useState("");
  const [tema, setTema] = useState("");
  const [informeDetallado, setInformeDetallado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreEvento || !fecha) {
      setError("El nombre del evento y la fecha son campos obligatorios.");
      setMensaje("");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_evento: nombreEvento,
          fecha: fecha,
          tema: tema,
          informe_detallado: informeDetallado,
          salon_id: 1,
          cliente_id: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.mensaje);
        setError("");
      } else {
        setError(data.mensaje || "Error al crear el evento.");
        setMensaje("");
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
      setMensaje("");
      console.error("Error:", error);
    }
  };

  const formStyles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginTop: "10px",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    textarea: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      height: "100px",
      resize: "vertical",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
    mensajeExito: {
      color: "green",
      textAlign: "center",
      marginTop: "10px",
    },
    mensajeError: {
      color: "red",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Crear Nuevo Evento</h2>
      <form style={formStyles.form} onSubmit={handleSubmit}>
        <label style={formStyles.label}>
          Nombre del evento:
          <input
            type="text"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
            style={formStyles.input}
          />
        </label>
        <label style={formStyles.label}>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={formStyles.input}
          />
        </label>
        <label style={formStyles.label}>
          Tema:
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            style={formStyles.input}
          />
        </label>
        <label style={formStyles.label}>
          Informe Detallado:
          <textarea
            value={informeDetallado}
            onChange={(e) => setInformeDetallado(e.target.value)}
            style={formStyles.textarea}
          />
        </label>
        <button type="submit" style={formStyles.button}>
          Crear Evento
        </button>
      </form>
      {mensaje && <p style={formStyles.mensajeExito}>{mensaje}</p>}
      {error && <p style={formStyles.mensajeError}>{error}</p>}
    </div>
  );
};

export default CrearEvento;