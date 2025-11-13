import React, { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaConciergeBell, FaEnvelope, FaSignOutAlt, FaCheckCircle, FaClipboardList } from 'react-icons/fa';

const ClienteDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("eventos");
  const [eventos, setEventos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState(null);
  const [eventoSeleccionadoNombre, setEventoSeleccionadoNombre] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000";

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
      // ✅ URL CRÍTICA: Llamar a la ruta general sin un ID de usuario
      const response = await fetch(`${BASE_URL}/api/servicios`); 
      
      if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error HTTP ${response.status}:`, errorText);
          throw new Error("Error al obtener servicios del servidor");
      }
      
      const data = await response.json();
      setServicios(data); // Almacena la lista de servicios
      console.log("Servicios cargados:", data.length); // DEBUG: Verifica si carga datos
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setServicios([]); 
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL]);

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
    if (!window.confirm(`¿Estás seguro de aceptar este servicio para el evento "${eventoNombre}"? Esto marcará el evento como 'APROBADO'.`)) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/ofertas_servicio/${ofertaId}/aceptar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Error al aceptar la oferta");
      const data = await response.json();
      alert(`✅ ${data.message}`);
      fetchEventos();
      if (eventoSeleccionadoId) {
        fetchOfertasPorEvento(eventoSeleccionadoId);
      }
    } catch (error) {
      console.error("Error al aceptar oferta:", error);
      alert("❌ Error al aceptar la oferta.");
    }
  };

  const handleEnviarMensaje = async (receptorId, receptorNombre) => {
    const mensaje = prompt(`Escribe tu mensaje para ${receptorNombre}:`);
    if (!mensaje || mensaje.trim() === "") return;
    if (!userId) {
      alert("Tu ID de cliente no está disponible.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/mensajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          remitente_id: userId,
          receptor_id: receptorId,
          contenido: mensaje
        })
      });
      if (!response.ok) throw new Error("Error al enviar el mensaje");
      alert("✅ Mensaje enviado al proveedor correctamente! (DB: mensajes afectada)");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("❌ Error al enviar el mensaje.");
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
        <p>Aún no has solicitado ningún evento.</p>
      ) : (
        <ul style={styles.list}>
          {eventos.map((evento) => (
            <li key={evento.id} style={styles.listItem(evento.estado)}>
              <h4>{evento.nombre_evento}</h4>
              <p>Fecha: {evento.fecha}</p>
              <p>Estado: <strong>{evento.estado.toUpperCase()}</strong></p>
              <button
                style={{ ...styles.actionButton, backgroundColor: '#3498db', width: 'auto' }}
                onClick={() => handleVerOfertas(evento.id, evento.nombre_evento)}
              >
                <FaClipboardList style={styles.navIcon} />
                Ver Ofertas de Servicio
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
        style={{ ...styles.actionButton, backgroundColor: '#95a5a6', marginBottom: '20px', width: 'auto' }}
        onClick={() => setSeccion("eventos")}
      >
        &lt; Volver a Mis Eventos
      </button>
      <h3>Ofertas para el Evento: "{eventoSeleccionadoNombre}"</h3>
      {isLoading ? (
        <p>Cargando ofertas...</p>
      ) : ofertas.length === 0 ? (
        <p>Aún no hay ofertas de servicios para este evento.</p>
      ) : (
        <ul style={styles.list}>
          {ofertas.map((oferta) => (
            <li key={oferta.id} style={styles.serviceItem}>
              <h4>{oferta.nombre_servicio} (${oferta.costo})</h4>
              <p>Proveedor: <strong>{oferta.proveedor_nombre}</strong></p>
              <p>Estado del Evento: <strong>{oferta.estado_evento.toUpperCase()}</strong></p>
              <button
                style={{ ...styles.actionButton, backgroundColor: oferta.estado_evento === 'aprobado' ? '#27ae60' : '#2ecc71', width: 'auto' }}
                onClick={() => handleAceptarOferta(oferta.id, eventoSeleccionadoNombre)}
                disabled={oferta.estado_evento === 'aprobado'}
              >
                <FaCheckCircle style={styles.navIcon} />
                {oferta.estado_evento === 'aprobado' ? 'Servicio Aceptado' : 'Aceptar Oferta y Aprobar Evento'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderServicios = () => {
    if (isLoading) return <p style={styles.loadingMessage}>Cargando servicios disponibles...</p>;
    if (servicios.length === 0) return <p style={styles.loadingMessage}>No hay servicios de proveedores disponibles en este momento.</p>;

    return (
        <div style={styles.serviciosGrid}>
            {servicios.map(servicio => (
                <div key={servicio.servicio_id} style={styles.servicioCard}>
                    <h3 style={styles.cardTitle}>{servicio.nombre_servicio}</h3>
                    <p style={styles.cardDescription}>{servicio.descripcion}</p>
                    <p style={styles.cardCost}>Costo: **${servicio.costo}**</p>
                    <p style={styles.cardProvider}>ID Proveedor: {servicio.proveedor_id}</p>
                    {/* Botón de ejemplo para solicitar */}
                    <button style={styles.requestButton} onClick={() => alert(`Solicitar servicio: ${servicio.nombre_servicio}`)}>
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
      <p>Funcionalidad para ver mensajes enviados y recibidos.</p>
    </div>
  );

  const renderContenido = () => {
    switch (seccion) {
      case "eventos":
        return renderEventos();
      case "servicios":
        return renderServicios();
      default:
            return <h2>Selecciona una sección</h2>;
      case "mensajes":
        return renderMensajes();
      case "ofertas":
        return renderOfertas();
      /*default:
        return <h2>Selecciona una sección</h2>;*/
    }
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    mainContent: {
      flexGrow: 1,
      padding: "30px",
    },
    title: {
      color: "#3498db",
      marginBottom: "30px",
    },
    navButton: (activo) => ({
      width: "100%",
      backgroundColor: activo ? "#3498db" : "transparent",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "left",
      cursor: "pointer",
      marginBottom: "10px",
      transition: "background-color 0.3s",
      display: "flex",
      alignItems: "center",
    }),
    navIcon: {
      marginRight: '10px'
    },
    logoutButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    },
    contentBox: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    },
    list: {
      listStyle: 'none',
      padding: 0
    },
    listItem: (estado) => ({
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      borderLeft: `5px solid ${estado === 'aprobado' ? '#2ecc71' : estado === 'rechazado' ? '#e74c3c' : '#f39c12'}`,
      backgroundColor: '#ecf0f1',
    }),
    serviceItem: {
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      borderLeft: '5px solid #9b59b6',
      backgroundColor: '#ecf0f1',
    },
    actionButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      color: "white",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background-color 0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div>
          <h2>👤 Panel Cliente</h2>
          <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
            ID Cliente: <strong>{userId || 'N/A'}</strong>
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
              Servicios (Proveedores)
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
