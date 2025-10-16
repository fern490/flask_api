import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    email: "",
    rol: "",
  });

  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, fecha_nacimiento, genero, email, rol } = formData;

    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !rol) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/registro-temporal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        console.log("Usuario temporal enviado a Flask:", formData);

        localStorage.setItem("usuarioTemporalGuardado", JSON.stringify(formData));

        setFormData({
          nombre: "",
          apellido: "",
          fecha_nacimiento: "",
          genero: "",
          email: "",
          rol: "",
        });
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar usuario temporal en el servidor.");
      }
    } catch (err) {
      console.error("Error de red o del servidor al enviar datos:", err);
      setError("Ocurrió un error al intentar conectar con el servidor.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            style={styles.input}
          />

          <fieldset style={styles.fieldset}>
            <legend>Género</legend>
            <label>
              <input
                type="radio"
                name="genero"
                value="Mujer"
                checked={formData.genero === "Mujer"}
                onChange={handleChange}
              />
              Mujer
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="genero"
                value="Hombre"
                checked={formData.genero === "Hombre"}
                onChange={handleChange}
              />
              Hombre
            </label>
          </fieldset>

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          {/* Selector de rol con ícono de información */}
          <div style={{ position: "relative" }}>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Seleccionar rol...</option>
              <option value="administrador">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="otros">Otros</option>
            </select>

            <div
              style={styles.infoCircle}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              i
              {showInfo && (
                <div style={styles.tooltip}>
                  <strong>Administrador:</strong> gestione eventos para los clientes <br />
                  <strong>Cliente:</strong> organize sus eventos <br />
                  <strong>Otros:</strong> preste sus servicios
                </div>
              )}
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Registrarse
          </button>

<<<<<<< HEAD
        <button type="submit" style={styles.button}>
          Registrarse
        </button>
        <a
          href="/login"
          style={{
            marginTop: "7px",
            display: "block",
            color: "#a8e0ff",
            textDecoration: "none",
            fontSize: "12px",
          }}
        >
          ¿Ya tenés una cuenta? Iniciá sesión
        </a>
      </form>
=======
          <a
            href="/login"
            style={{
              marginTop: "10px",
              display: "block",
              color: "#a8e0ff",
              textDecoration: "none",
            }}
          >
            ¿Ya tenés una cuenta? <br /> Iniciá sesión
          </a>
        </form>
      </div>
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
    </div>
  );
};

const styles = {
  container: {
<<<<<<< HEAD
    width: "272px",
    margin: "16px auto",
    padding: "16px",
    border: "4px solid #cccccc3d",
    borderRadius: "6.5px",
=======
    width: "260px",  // un poco más pequeño
    margin: "0 auto",
    padding: "14px",
    border: "4px solid #cccccc3d",
    borderRadius: "6px",
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    backgroundColor: "#425e62ff",
    color: "white",
    position: "relative",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  input: {
<<<<<<< HEAD
    margin: "8px 0",
    padding: "8px",
    fontSize: "13px",
    borderRadius: "3px",
    border: "0.8px solid #ccc",
  },

  fieldset: {
    margin: "12px 0",
    padding: "8px",
    border: "0.8px solid #ccc",
    borderRadius: "3px",
    textAlign: "left",
    fontSize: "13px",
  },

  label: {
    display: "block",
    marginBottom: "6.5px",
    cursor: "pointer",
  },

  button: {
    padding: "8px",
=======
    margin: "6px 0",
    padding: "7px",
    fontSize: "13px",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },

  fieldset: {
    margin: "10px 0",
    padding: "7px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    textAlign: "left",
    fontSize: "13px",
  },

  button: {
    padding: "7px",
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "3px",
    fontSize: "13px",
  },

  error: {
    color: "red",
    fontSize: "12px",
<<<<<<< HEAD
    margin: "8px 0",
=======
    margin: "6px 0",
  },

  infoCircle: {
    display: "inline-block",
    marginLeft: "10px",
    backgroundColor: "#2980b9",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
    position: "absolute",
    top: "6px",
    right: "-10px",
    lineHeight: "18px",
  },

  tooltip: {
    position: "absolute",
    top: "30px",
    right: "-250px",
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "240px",
    fontSize: "12px",
    textAlign: "left",
    zIndex: 10,
  },

  wrapper: {
    minHeight: "80vh",
    padding: "20px 10px", 
    margin: "auto",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d
  },
};

export default Register;
