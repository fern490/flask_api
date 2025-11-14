import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaClipboardList, FaEnvelope, FaCogs, FaSignOutAlt, FaRocket } from "react-icons/fa";

const OtrosDashboard = ({ onLogout }) => {
  const [seccion, setSeccion] = useState("servicios");
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editandoServicio, setEditandoServicio] = useState(null);
  const [showCrearServicioForm, setShowCrearServicioForm] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre_servicio: "",
    descripcion: "",
    costo: ""
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState(null);

  const userIdFromStorage = sessionStorage.getItem("userId");
  const proveedorId = userIdFromStorage ? parseInt(userIdFromStorage) : null;
  const BASE_URL = "http://127.0.0.1:5000";

  /*========================================================
    FUNCIONES Y HOOKS (deben ir SIEMPRE antes del 'return')
    ========================================================*/

  const resetCrearServicio = () => {
    setNuevoServicio({ nombre_servicio: "", descripcion: "", costo: "" });
    setShowCrearServicioForm(false);
  };

  const fetchServicios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/servicios?proveedor_id=${proveedorId}`
      );
      if (!response.ok) throw new Error("Error al obtener servicios");

      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setServicios([]);
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL, proveedorId]);

  const handleCrearServicio = async (e) => {
    e.preventDefault();

    if (
      !nuevoServicio.nombre_servicio ||
      !nuevoServicio.descripcion ||
      !nuevoServicio.costo
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const costoNumerico = parseFloat(nuevoServicio.costo);
    if (isNaN(costoNumerico) || costoNumerico <= 0) {
      alert("El costo debe ser un número positivo.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/servicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoServicio,
          costo: costoNumerico,
          proveedor_id: proveedorId
        })
      });

      if (!response.ok) throw new Error("Error al crear servicio");

      alert("Servicio creado con éxito!");
      resetCrearServicio();
      fetchServicios();
    } catch (error) {
      console.error("Error al crear servicio:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/api/servicios/${editandoServicio.servicio_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editandoServicio)
        }
      );

      if (!response.ok) throw new Error("Error al editar servicio");

      alert("Servicio actualizado con éxito!");
      setEditandoServicio(null);
      fetchServicios();
    } catch (error) {
      console.error("Error al editar servicio:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteClick = (servicio) => {
    setServicioAEliminar(servicio);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!servicioAEliminar) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/servicios/${servicioAEliminar.servicio_id}?proveedor_id=${proveedorId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Error al eliminar servicio");
      alert("Servicio eliminado con éxito.");
      setShowConfirmModal(false);
      setServicioAEliminar(null);
      fetchServicios();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    if (seccion === "servicios") fetchServicios();
  }, [seccion, fetchServicios]);

  // ============================================================
  // ✔️ AHORA SÍ VA EL RETURN CONDICIONAL (después de todos los hooks)
  // ============================================================

  if (!proveedorId) {
    alert("Error: no se encontró el ID del proveedor. Inicia sesión nuevamente.");
    onLogout();
    return null;
  }

  // ============================================================
  // FORMULARIO
  // ============================================================

  const CrearServicioForm = () => (
    <div style={styles.formContainer}>
      <h3>Nuevo Servicio</h3>
      <form onSubmit={handleCrearServicio}>
        <label style={styles.formLabel}>Nombre del Servicio:</label>
        <input
          type="text"
          value={nuevoServicio.nombre_servicio}
          onChange={(e) =>
            setNuevoServicio({
              ...nuevoServicio,
              nombre_servicio: e.target.value
            })
          }
          style={styles.formInput}
          required
        />

        <label style={styles.formLabel}>Costo (USD):</label>
        <input
          type="number"
          value={nuevoServicio.costo}
          onChange={(e) =>
            setNuevoServicio({ ...nuevoServicio, costo: e.target.value })
          }
          style={styles.formInput}
          min="0.01"
          step="0.01"
          required
        />

        <label style={styles.formLabel}>Descripción:</label>
        <textarea
          value={nuevoServicio.descripcion}
          onChange={(e) =>
            setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })
          }
          style={styles.formTextarea}
          rows="4"
          required
        />

        <div style={styles.formActions}>
          <button type="submit" style={styles.formButton}>
            <FaPlus /> Guardar
          </button>
          <button
            type="button"
            onClick={resetCrearServicio}
            style={{ ...styles.formButton, backgroundColor: "#f44336" }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  // ============================================================
  // CONTENIDOS
  // ============================================================

  const renderContenido = () => {
    switch (seccion) {
      case "servicios":
        if (isLoading) return <p>Cargando servicios...</p>;
        if (showCrearServicioForm) return <CrearServicioForm />;

        return (
          <div>
            <h3>Gestión de Servicios</h3>
            <button
              onClick={() => setShowCrearServicioForm(true)}
              style={styles.crearButton}
            >
              <FaPlus /> Crear Servicio
            </button>

            <div style={styles.serviciosGrid}>
              {servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <div key={servicio.servicio_id} style={styles.servicioCard}>
                    <h4>{servicio.nombre_servicio}</h4>
                    <p>{servicio.descripcion}</p>
                    <p>
                      <strong>Costo:</strong> $
                      {parseFloat(servicio.costo).toFixed(2)}
                    </p>
                    <div style={styles.servicioActions}>
                      <button
                        onClick={() => setEditandoServicio(servicio)}
                        style={styles.editButton}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(servicio)}
                        style={styles.deleteButton}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tienes servicios registrados.</p>
              )}
            </div>

            {/* MODAL EDICIÓN */}
            {editandoServicio && (
              <div style={styles.modalOverlay}>
                <div style={styles.editModal}>
                  <h4>Editar Servicio</h4>
                  <form onSubmit={handleEditSubmit}>
                    <label style={styles.formLabel}>Nombre:</label>
                    <input
                      type="text"
                      value={editandoServicio.nombre_servicio}
                      onChange={(e) =>
                        setEditandoServicio({
                          ...editandoServicio,
                          nombre_servicio: e.target.value
                        })
                      }
                      style={styles.formInput}
                      required
                    />

                    <label style={styles.formLabel}>Costo:</label>
                    <input
                      type="number"
                      value={editandoServicio.costo}
                      onChange={(e) =>
                        setEditandoServicio({
                          ...editandoServicio,
                          costo: e.target.value
                        })
                      }
                      style={styles.formInput}
                      required
                    />

                    <label style={styles.formLabel}>Descripción:</label>
                    <textarea
                      value={editandoServicio.descripcion}
                      onChange={(e) =>
                        setEditandoServicio({
                          ...editandoServicio,
                          descripcion: e.target.value
                        })
                      }
                      style={styles.formTextarea}
                      rows="4"
                      required
                    />

                    <div style={styles.formActions}>
                      <button type="submit" style={styles.formButton}>
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditandoServicio(null)}
                        style={{
                          ...styles.formButton,
                          backgroundColor: "#555"
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL CONFIRMACIÓN */}
            {showConfirmModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.confirmModal}>
                  <h3>¿Eliminar este servicio?</h3>
                  <p>
                    <strong>{servicioAEliminar?.nombre_servicio}</strong>
                  </p>
                  <div style={styles.formActions}>
                    <button
                      onClick={handleConfirmDelete}
                      style={{
                        ...styles.formButton,
                        backgroundColor: "#f44336"
                      }}
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmModal(false);
                        setServicioAEliminar(null);
                      }}
                      style={{ ...styles.formButton, backgroundColor: "#555" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "solicitudes":
        return <h3>🚀 Solicitudes de Servicio (en desarrollo)</h3>;

      case "mensajes":
        return <h3>💬 Bandeja de Mensajes</h3>;

      case "configuracion":
        return <h3>⚙️ Configuración del Perfil (en desarrollo)</h3>;

      default:
        return <h3>Seleccione una sección</h3>;
    }
  };

  // ============================================================
  // ESTILOS
  // ============================================================

  const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#1a1a1a" },
    sidebar: {
      width: "250px",
      backgroundColor: "#2c2c2c",
      padding: "20px",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    mainContent: {
      flexGrow: 1,
      padding: "30px",
      backgroundColor: "#1f1f1f",
      color: "white"
    },
    navSection: { marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" },
    navButton: (active) => ({
      backgroundColor: active ? "#00bcd4" : "transparent",
      color: active ? "#1a1a1a" : "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "16px",
      fontWeight: active ? "bold" : "normal",
    }),
    logoutButton: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px"
    },
    crearButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    formContainer: { backgroundColor: "#2c2c2c", padding: "25px", borderRadius: "8px", maxWidth: "600px" },
    formLabel: { color: "#ccc", margin: "10px 0 5px" },
    formInput: { width: "100%", padding: "10px", backgroundColor: "#3a3a3a", border: "1px solid #555", color: "white" },
    formTextarea: { width: "100%", padding: "10px", backgroundColor: "#3a3a3a", border: "1px solid #555", color: "white" },
    formActions: { display: "flex", gap: "10px", marginTop: "20px" },
    formButton: { backgroundColor: "#00bcd4", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" },
    serviciosGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
    servicioCard: { backgroundColor: "#2c2c2c", padding: "15px", borderRadius: "8px" },
    servicioActions: { display: "flex", gap: "10px", marginTop: "10px" },
    editButton: { backgroundColor: "#ffc107", color: "#1a1a1a", border: "none", padding: "8px 12px", borderRadius: "4px" },
    deleteButton: { backgroundColor: "#f44336", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px" },
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    editModal: { backgroundColor: "#1f1f1f", padding: "30px", borderRadius: "8px", maxWidth: "500px", width: "90%" },
    confirmModal: { backgroundColor: "#2c2c2c", padding: "25px", borderRadius: "8px", width: "90%", maxWidth: "400px", textAlign: "center" }
  };

  // ============================================================
  // LAYOUT PRINCIPAL
  // ============================================================

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div>
          <h2>🎵 Panel Proveedor</h2>
          <div style={styles.navSection}>
            <button style={styles.navButton(seccion === "servicios")} onClick={() => setSeccion("servicios")}>
              <FaClipboardList /> Servicios
            </button>
            <button style={styles.navButton(seccion === "solicitudes")} onClick={() => setSeccion("solicitudes")}>
              <FaRocket /> Solicitudes
            </button>
            <button style={styles.navButton(seccion === "mensajes")} onClick={() => setSeccion("mensajes")}>
              <FaEnvelope /> Mensajes
            </button>
            <button style={styles.navButton(seccion === "configuracion")} onClick={() => setSeccion("configuracion")}>
              <FaCogs /> Configuración
            </button>
          </div>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </div>

      <div style={styles.mainContent}>{renderContenido()}</div>
    </div>
  );
};

export default OtrosDashboard;
