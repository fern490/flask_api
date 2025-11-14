import React, { useState, useEffect, useCallback } from "react";
import {
  FaCalendarAlt,
  FaConciergeBell,
  FaEnvelope,
  FaSignOutAlt,
  FaCheckCircle,
  FaClipboardList
} from "react-icons/fa";

const ClienteDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("eventos");
  const [eventos, setEventos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState(null);
  const [eventoSeleccionadoNombre, setEventoSeleccionadoNombre] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000";

  /* ============================
      FETCH: EVENTOS DEL CLIENTE
     ============================ */
  const fetchEventos = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/eventos/cliente/${userId}`);
      if (!response.ok) throw new Error("Error al obtener eventos");

      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchServicios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/servicios`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener servicios"); 
      }

      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOfertasPorEvento = useCallback(async (eventoId) => {
    if (!eventoId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/eventos/${eventoId}/ofertas`);
      if (!response.ok) throw new Error("Error al obtener ofertas");

      const data = await response.json();
      setOfertas(data);
    } catch (error) {
      console.error("Error al obtener ofertas:", error);
      setOfertas([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerOfertas = (eventoId, eventoNombre) => {
    setEventoSeleccionadoId(eventoId);
    setEventoSeleccionadoNombre(eventoNombre);
    setSeccion("ofertas");
  };

  const handleAceptarOferta = async (ofertaId, eventoNombre) => {
    if (!window.confirm(`¿Aceptar servicio para el evento "${eventoNombre}"?`)) return;

    try {
      const response = await fetch(`${BASE_URL}/api/ofertas_servicio/${ofertaId}/aceptar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Error al aceptar la oferta");

      const data = await response.json();
      alert(`✔ ${data.message}`);

      fetchEventos();
      if (eventoSeleccionadoId) fetchOfertasPorEvento(eventoSeleccionadoId);

    } catch (error) {
      console.error("Error al aceptar oferta:", error);
      alert("❌ No se pudo aceptar la oferta.");
    }
  };

  /*==============
    ENVIAR MENSAJE
    ==============*/
  const handleEnviarMensaje = async (receptorId, receptorNombre) => {
    const mensaje = prompt(`Mensaje para ${receptorNombre}:`);
    if (!mensaje?.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          remitente_id: userId,
          receptor_id: receptorId,
          contenido: mensaje
        })
      });

      if (!response.ok) throw new Error("Error al enviar el mensaje");

      alert("📨 Mensaje enviado.");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("❌ No se pudo enviar el mensaje.");
    }
  };

  useEffect(() => {
    if (seccion === "eventos") {
      fetchEventos();
      setOfertas([]);
    } else if (seccion === "servicios") {
      fetchServicios();
    } else if (seccion === "ofertas" && eventoSeleccionadoId) {
      fetchOfertasPorEvento(eventoSeleccionadoId);
    }
  }, [seccion, fetchEventos, fetchServicios, eventoSeleccionadoId, fetchOfertasPorEvento]);

  const renderEventos = () => (
    <div>
      <h3>Mis Eventos Solicitados ({eventos.length})</h3>
      {isLoading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>No has solicitado eventos aún.</p>
      ) : (
        <ul style={styles.list}>
          {eventos.map((evento) => (
            <li key={evento.id} style={styles.listItem(evento.estado)}>
              <h4>{evento.nombre_evento}</h4>
              <p>Fecha: {evento.fecha}</p>
              <p>Estado: <strong>{evento.estado.toUpperCase()}</strong></p>

              <button
                style={{ ...styles.actionButton, backgroundColor: "#3498db" }}
                onClick={() => handleVerOfertas(evento.id, evento.nombre_evento)}
              >
                <FaClipboardList style={styles.navIcon} />
                Ver ofertas
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderOfertas = () => (
    <div>
      <button
        style={{ ...styles.actionButton, backgroundColor: "#95a5a6", marginBottom: 20 }}
        onClick={() => setSeccion("eventos")}
      >
        ← Volver a Mis Eventos
      </button>

      <h3>Ofertas para: "{eventoSeleccionadoNombre}"</h3>

      {isLoading ? (
        <p>Cargando ofertas...</p>
      ) : ofertas.length === 0 ? (
        <p>Este evento no tiene ofertas aún.</p>
      ) : (
        <ul style={styles.list}>
          {ofertas.map((o) => (
            <li key={o.id} style={styles.serviceItem}>
              <h4>{o.nombre_servicio} — ${o.costo}</h4>
              <p>Proveedor: <strong>{o.proveedor_nombre}</strong></p>

              {/* Aceptar Servicio */}
              <button
                style={{
                  ...styles.actionButton,
                  backgroundColor: o.estado_evento === "aprobado" ? "#27ae60" : "#2ecc71"
                }}
                disabled={o.estado_evento === "aprobado"}
                onClick={() => handleAceptarOferta(o.id, eventoSeleccionadoNombre)}
              >
                <FaCheckCircle style={styles.navIcon} />
                {o.estado_evento === "aprobado" ? "Servicio aceptado" : "Aceptar oferta"}
              </button>

              {/* ENVIAR MENSAJE */}
              <button
                style={{
                  ...styles.actionButton,
                  backgroundColor: "#3498db"
                }}
                onClick={() => handleEnviarMensaje(o.proveedor_id, o.proveedor_nombre)}
              >
                <FaEnvelope style={styles.navIcon} />
                Enviar Mensaje
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderServicios = () => {
    if (isLoading) return <p>Cargando servicios...</p>;
    if (servicios.length === 0) return <p>No hay servicios disponibles.</p>;

    return (
      <div style={styles.serviciosGrid}>
        {servicios.map((s) => (
          <div key={s.servicio_id} style={styles.servicioCard}>
            <h3>{s.nombre_servicio}</h3>
            <p>{s.descripcion}</p>
            <p><strong>${s.costo}</strong></p>
            <p>Proveedor: {s.proveedor_id}</p>

            <button style={styles.requestButton}>
              Solicitar
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderMensajes = () => (
    <div>
      <h3>Mensajes</h3>
      <p>Próximamente...</p>
    </div>
  );

  /*================
    SWITCH PRINCIPAL
    ================*/
  const renderContenido = () => {
    switch (seccion) {
      case "eventos":
        return renderEventos();
      case "servicios":
        return renderServicios();
      case "mensajes":
        return renderMensajes();
      case "ofertas":
        return renderOfertas();
      default:
        return <h2>Selecciona una sección</h2>;
    }
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#ffffffff"
    },
    sidebar: {
      width: 250,
      backgroundColor: "#2c3e50",
      color: "white",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
    },
    navSection: { marginTop: 20 },
    mainContent: { flexGrow: 1, padding: 30 },
    title: { color: "#3498db", marginBottom: 30 },

    navButton: (active) => ({
      width: "100%",
      backgroundColor: active ? "#3498db" : "transparent",
      color: "white",
      border: "none",
      padding: 10,
      borderRadius: 5,
      textAlign: "left",
      cursor: "pointer",
      marginBottom: 10,
      display: "flex",
      alignItems: "center"
    }),
    navIcon: { marginRight: 10 },
    logoutButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: 10,
      borderRadius: 5,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    contentBox: {
      backgroundColor: "white",
      padding: 30,
      borderRadius: 8,
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
    },
    list: { listStyle: "none", padding: 0 },
    listItem: (estado) => ({
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
      borderLeft: `5px solid ${
        estado === "aprobado"
          ? "#2ecc71"
          : estado === "rechazado"
          ? "#e74c3c"
          : "#f39c12"
      }`,
      backgroundColor: "#ecf0f1"
    }),
    serviceItem: {
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
      borderLeft: "5px solid #9b59b6",
      backgroundColor: "#8b8f1bff"
    },
    actionButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: 5,
      color: "white",
      cursor: "pointer",
      marginTop: 10,
      display: "flex",
      alignItems: "center"
    },
    serviciosGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 20
    },
    servicioCard: {
      backgroundColor: "rgb(122, 207, 178)",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    },
    requestButton: {
      backgroundColor: "#3498db",
      border: "none",
      padding: 10,
      color: "white",
      width: "100%",
      cursor: "pointer",
      borderRadius: 5
    }
  };

  /*============
    RENDER FINAL
    ============*/
  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div>
          <h2>👤 Panel Cliente</h2>
          <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
            ID Cliente: <strong>{userId || "N/A"}</strong>
          </p>

          <div style={styles.navSection}>
            <button
              style={styles.navButton(seccion === "eventos" || seccion === "ofertas")}
              onClick={() => setSeccion("eventos")}
            >
              <FaCalendarAlt style={styles.navIcon} />
              Mis Eventos
            </button>

            <button
              style={styles.navButton(seccion === "servicios")}
              onClick={() => setSeccion("servicios")}
            >
              <FaConciergeBell style={styles.navIcon} />
              Servicios(Proveedores)
            </button>

            <button
              style={styles.navButton(seccion === "mensajes")}
              onClick={() => setSeccion("mensajes")}
            >
              <FaEnvelope style={styles.navIcon} />
              Mensajes
            </button>
          </div>
        </div>

        <button onClick={onLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.navIcon} />
          Cerrar sesión
        </button>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Área Personal del Cliente</h1>
        <div style={styles.contentBox}>{renderContenido()}</div>
      </div>
    </div>
  );
};

export default ClienteDashboard;
