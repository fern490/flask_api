import React, { useEffect, useState, useCallback } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaUsers,
  FaPlusCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la navegación

const AdminDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("eventos-pendientes");
  const [eventosPendientes, setEventosPendientes] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(true);

  // ESTADOS DE MENSAJERÍA (Iguales a los otros paneles)
  const [contactos, setContactos] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMensajes, setLoadingMensajes] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const BASE_URL = "http://127.0.0.1:5000";

  // ========================================================================
  // LÓGICA DE EVENTOS PENDIENTES
  // ========================================================================

  const fetchEventosPendientes = useCallback(async () => {
    try {
      setLoadingEventos(true);
      const response = await fetch(`${BASE_URL}/api/eventos/pendientes`);
      if (!response.ok) throw new Error("Error al obtener eventos");
      const data = await response.json();
      setEventosPendientes(data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    } finally {
      setLoadingEventos(false);
    }
  }, [BASE_URL]);

  const manejarEvento = async (eventoId, accion) => {
    try {
      const response = await fetch(`${BASE_URL}/api/eventos/${eventoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: accion }),
      });

      if (!response.ok) throw new Error("Error al actualizar evento");

      // Actualizar lista de eventos pendientes
      setEventosPendientes(
        eventosPendientes.filter((e) => e.evento_id !== eventoId)
      );
      alert(`Evento ${accion} con éxito`);
    } catch (error) {
      console.error("Error al actualizar evento:", error);
      alert("Ocurrió un error al procesar el evento.");
    }
  };

  // ========================================================================
  // LÓGICA DE MENSAJERÍA (Idéntica a ClienteDashboard.jsx/OtrosDashboard.jsx)
  // ========================================================================

  const fetchContacts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoadingMensajes(true);
      const response = await fetch(`${BASE_URL}/api/usuarios/contactos/${userId}`);
      if (!response.ok) throw new Error("Error al obtener contactos");
      const data = await response.json();
      setContactos(data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    } finally {
      setLoadingMensajes(false);
    }
  }, [userId, BASE_URL]);

  const fetchConversation = useCallback(
    async (contactId) => {
      if (!userId || !contactId) return;
      try {
        const response = await fetch(
          `${BASE_URL}/api/mensajes/conversacion/${userId}/${contactId}`
        );
        if (!response.ok) throw new Error("Error al obtener conversación");
        const data = await response.json();
        setConversation(data);
      } catch (error) {
        console.error("Error al obtener conversación:", error);
      }
    },
    [userId, BASE_URL]
  );

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const response = await fetch(`${BASE_URL}/api/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          remitente_id: parseInt(userId),
          receptor_id: selectedContact.id,
          contenido: newMessage.trim(),
        }),
      });

      if (!response.ok) throw new Error("Error al enviar mensaje");
      const nuevoMensaje = await response.json();
      
      setConversation((prev) => [...prev, nuevoMensaje]);
      setNewMessage("");
      // Desplazar al último mensaje después de enviar
      setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 100);
      
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Error al enviar mensaje.");
    }
  };

  // ========================================================================
  // USE EFFECTS
  // ========================================================================

  useEffect(() => {
    if (seccion === "eventos-pendientes") {
      fetchEventosPendientes();
    }
  }, [seccion, fetchEventosPendientes]);

  useEffect(() => {
    if (seccion === "mensajes") {
      fetchContacts();
    }
  }, [seccion, fetchContacts]);

  useEffect(() => {
    if (selectedContact) {
      fetchConversation(selectedContact.id);
    }
  }, [selectedContact, fetchConversation]);

  // Efecto para desplazar al final del chat al cargar la conversación
  useEffect(() => {
    if (seccion === "mensajes" && selectedContact) {
      const chatBox = document.getElementById('chat-box');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [conversation, seccion, selectedContact]);

  // ========================================================================
  // RENDERS
  // ========================================================================

  const renderEventosPendientes = () => {
    // La vista original del dashboard de Admin
    return (
      <div style={styles.eventosContainer}>
        <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>
          Eventos Pendientes de Aprobación ({eventosPendientes.length})
        </h2>
        {loadingEventos ? (
          <p>Cargando eventos...</p>
        ) : eventosPendientes.length === 0 ? (
          <p style={styles.text}>No hay eventos pendientes actualmente. ✅</p>
        ) : (
          eventosPendientes.map((evento) => (
            <div key={evento.evento_id} style={styles.eventoCard}>
              <h3>{evento.nombre_evento}</h3>
              <p>
                <strong>Cliente ID:</strong> {evento.cliente_id}
              </p>
              <p>
                <strong>Fecha:</strong> {evento.fecha}
              </p>
              <p>
                <strong>Invitados:</strong> {evento.cantidad_invitados}
              </p>
              <p>
                <strong>Salón:</strong> {evento.salon_nombre || "No Asignado"}
              </p>
              <div style={styles.botones}>
                <button
                  style={{ ...styles.boton, backgroundColor: "#2ecc71" }}
                  onClick={() =>
                    manejarEvento(evento.evento_id, "aprobado")
                  }
                >
                  Aprobar
                </button>
                <button
                  style={{ ...styles.boton, backgroundColor: "#e74c3c" }}
                  onClick={() =>
                    manejarEvento(evento.evento_id, "rechazado")
                  }
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderMensajes = () => {
    const isSender = (id) => id === parseInt(userId);

    return (
      <div style={styles.chatContainer}>
        <div style={styles.contactList}>
          <h3 style={{ color: '#00bcd4', marginBottom: '15px' }}>Contactos</h3>
          {loadingMensajes ? (
            <p style={{ color: '#aaa' }}>Cargando contactos...</p>
          ) : contactos.length === 0 ? (
            <p style={{ color: '#aaa' }}>No hay contactos disponibles.</p>
          ) : (
            contactos.map((contact) => (
              <div
                key={contact.id}
                style={styles.contactItem(selectedContact && selectedContact.id === contact.id)}
                onClick={() => setSelectedContact(contact)}
              >
                {contact.nombre} ({contact.rol})
              </div>
            ))
          )}
        </div>

        <div style={styles.chatWindow}>
          {selectedContact ? (
            <>
              <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #3c3c3c", paddingBottom: "5px" }}>
                Conversación con {selectedContact.nombre}
              </h3>
              <div id="chat-box" style={styles.messagesDisplay}>
                {conversation.length === 0 ? (
                  <p style={{ color: '#aaa', textAlign: 'center' }}>Comienza una conversación...</p>
                ) : (
                  conversation.map((msg) => (
                    <div
                      key={msg.id}
                      style={styles.messageBubble(isSender(msg.remitente_id))}
                    >
                      <p style={styles.messageContent}>{msg.contenido}</p>
                      <p style={styles.messageFooter}>{msg.fecha_envio}</p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={sendMessage} style={styles.messageInputContainer}>
                <input
                  type="text"
                  style={styles.messageInput}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Escribe a ${selectedContact.nombre}...`}
                />
                <button type="submit" style={styles.sendButton} disabled={!newMessage.trim()}>
                  <FaPaperPlane style={{ marginRight: '5px' }} /> Enviar
                </button>
              </form>
            </>
          ) : (
            <p style={{ color: '#aaa', textAlign: 'center', marginTop: '50px' }}>
              Selecciona un contacto para iniciar el chat.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderUsuarios = () => {
    // Pendiente de implementar
    return <h2 style={styles.placeholderTitle}>Gestión de Usuarios (Pendiente)</h2>;
  };

  const renderContenido = () => {
    if (seccion === "eventos-pendientes") {
      return renderEventosPendientes();
    }
    if (seccion === "mensajes") {
      return renderMensajes();
    }
    if (seccion === "usuarios") {
      return renderUsuarios();
    }
    // Redirección interna para crear evento
    if (seccion === "crear-evento") {
        navigate("/crear-evento");
        return <p>Redirigiendo a Crear Evento...</p>; 
    }
    return <h2 style={styles.placeholderTitle}>Selecciona una sección</h2>;
  };

  // ========================================================================
  // ESTILOS (Unificados con los otros paneles)
  // ========================================================================

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#2c3e50", // Fondo principal
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#34495e", // Fondo sidebar
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    mainContent: {
      flexGrow: 1,
      padding: "20px",
      color: "white",
      overflowY: "auto",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#e74c3c", // Color destacado
      borderBottom: "2px solid #e74c3c",
      paddingBottom: "10px",
    },
    contentBox: {
      backgroundColor: "#34495e", // Fondo del contenido
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    navSection: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    navButton: (isSelected) => ({
      padding: "12px",
      backgroundColor: isSelected ? "#e74c3c" : "transparent", // Color Admin
      border: "none",
      color: "white",
      textAlign: "left",
      cursor: "pointer",
      borderRadius: "5px",
      fontWeight: isSelected ? "bold" : "normal",
      display: "flex",
      alignItems: "center",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: isSelected ? "#c0392b" : "#4a637d",
      },
    }),
    navIcon: {
      marginRight: "10px",
    },
    logoutButton: {
      padding: "10px",
      backgroundColor: "#9b59b6",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#8e44ad",
      },
    },
    placeholderTitle: {
        color: "#bdc3c7",
        textAlign: 'center',
        padding: '50px 0',
    },
    
    // ESTILOS ESPECÍFICOS DE EVENTOS
    eventosContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
    },
    eventoCard: {
        backgroundColor: "#2c3e50",
        padding: "15px",
        borderRadius: "8px",
        borderLeft: "5px solid #e74c3c",
    },
    botones: {
        display: "flex",
        gap: "10px",
        marginTop: "15px",
    },
    boton: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
    },
    
    // ESTILOS DE MENSAJERÍA (CHAT)
    chatContainer: {
        display: "flex",
        height: "70vh", // Altura fija para el chat
        maxHeight: "600px",
        backgroundColor: "#2c3e50",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
    contactList: {
        width: "250px",
        borderRight: "1px solid #3c3c3c",
        padding: "15px",
        overflowY: "auto",
        backgroundColor: "#34495e",
    },
    contactItem: (isSelected) => ({
        padding: "10px",
        cursor: "pointer",
        backgroundColor: isSelected ? "#2c3e50" : "transparent",
        borderRadius: "4px",
        marginBottom: "5px",
        transition: "background-color 0.2s",
        "&:hover": {
            backgroundColor: isSelected ? "#2c3e50" : "#4a637d",
        },
        borderLeft: isSelected ? "3px solid #00bcd4" : "3px solid transparent",
    }),
    chatWindow: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: "15px",
    },
    messagesDisplay: {
        flexGrow: 1,
        overflowY: "auto",
        marginBottom: "10px",
        paddingRight: "10px",
        // Scrollbar style
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: '4px' },
        '&::-webkit-scrollbar-track': { backgroundColor: '#333' },
    },
    messageBubble: (isSender) => ({
        maxWidth: "70%",
        padding: "10px",
        borderRadius: "15px",
        marginBottom: "8px",
        alignSelf: isSender ? "flex-end" : "flex-start",
        backgroundColor: isSender ? "#e74c3c" : "#3498db", // Admin color
        marginLeft: isSender ? "auto" : "0",
        marginRight: isSender ? "0" : "auto",
        wordWrap: "break-word",
    }),
    messageContent: {
        margin: "0",
        fontSize: "0.95rem",
    },
    messageFooter: {
        margin: "5px 0 0 0",
        fontSize: "0.7rem",
        opacity: "0.7",
        textAlign: "right",
    },
    messageInputContainer: {
        display: "flex",
        paddingTop: "10px",
        borderTop: "1px solid #3c3c3c",
    },
    messageInput: {
        flexGrow: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #3c3c3c",
        backgroundColor: "#34495e",
        color: "white",
        marginRight: "10px",
    },
    sendButton: {
        backgroundColor: "#2ecc71",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s',
        "&:hover": {
            backgroundColor: "#27ae60",
        },
        "&:disabled": {
            backgroundColor: "#555",
            cursor: "not-allowed",
        }
    },
  };

  // ========================================================================
  // COMPONENTE PRINCIPAL
  // ========================================================================

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div>
          <h2>👑 Panel Admin</h2>
          <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
            ID Admin: <strong>{userId || "N/A"}</strong>
          </p>
          <div style={styles.navSection}>
            <button
              style={styles.navButton(seccion === "eventos-pendientes")}
              onClick={() => setSeccion("eventos-pendientes")}
            >
              <FaCalendarAlt style={styles.navIcon} />
              Eventos Pendientes
            </button>
            
            <button
              style={styles.navButton(seccion === "mensajes")}
              onClick={() => setSeccion("mensajes")}
            >
              <FaEnvelope style={styles.navIcon} />
              Mensajes
            </button>
            
            <button
              style={styles.navButton(seccion === "usuarios")}
              onClick={() => setSeccion("usuarios")}
            >
              <FaUsers style={styles.navIcon} />
              Gestión Usuarios
            </button>
            
            <button
              style={styles.navButton(seccion === "crear-evento")}
              // Nota: Cambiamos a setSeccion y luego renderContenido hace la navegación
              onClick={() => setSeccion("crear-evento")} 
            >
              <FaPlusCircle style={styles.navIcon} />
              Crear Evento
            </button>
          </div>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.navIcon} />
          Cerrar sesión
        </button>
      </div>
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Panel de Administración</h1>
        <div style={styles.contentBox}>{renderContenido()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;