import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [eventosPendientes, setEventosPendientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener eventos pendientes desde la API
  const fetchEventosPendientes = async () => {
    try {
      const response = await fetch("/api/eventos/pendientes");
      const data = await response.json();
      setEventosPendientes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventosPendientes();
  }, []);

  // Función para aprobar o rechazar evento
  const manejarEvento = async (eventoId, accion) => {
    try {
      await fetch(`/api/eventos/${eventoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: accion }),
      });

      // Actualizar lista de eventos pendientes
      setEventosPendientes(eventosPendientes.filter(e => e.evento_id !== eventoId));
      alert(`Evento ${accion} con éxito`);
    } catch (error) {
      console.error("Error al actualizar evento:", error);
      alert("Ocurrió un error al procesar el evento.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, Administrador</h1>
      <p style={styles.text}>
        Aquí puedes revisar y aprobar o rechazar los eventos solicitados por los clientes.
      </p>

      {loading ? (
        <p>Cargando eventos pendientes...</p>
      ) : eventosPendientes.length === 0 ? (
        <p>No hay eventos pendientes en este momento.</p>
      ) : (
        <div style={styles.eventosContainer}>
          {eventosPendientes.map(evento => (
            <div key={evento.evento_id} style={styles.eventoCard}>
              <h3>{evento.nombre_evento}</h3>
              <p><strong>Cliente:</strong> {evento.cliente_nombre}</p>
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Salón:</strong> {evento.salon_nombre}</p>
              <p><strong>Cantidad de personas:</strong> {evento.cantidad_personas}</p>
              <p><strong>Tema:</strong> {evento.tema}</p>
              <div style={styles.botones}>
                <button
                  style={{ ...styles.boton, backgroundColor: "#2ecc71" }}
                  onClick={() => manejarEvento(evento.evento_id, "aprobado")}
                >
                  Aprobar
                </button>
                <button
                  style={{ ...styles.boton, backgroundColor: "#e74c3c" }}
                  onClick={() => manejarEvento(evento.evento_id, "rechazado")}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#e74c3c",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  eventosContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
  },
  eventoCard: {
    backgroundColor: "#34495e",
    padding: "15px",
    borderRadius: "8px",
  },
  botones: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  boton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default AdminDashboard;
