import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./AdminDashboard.css";

// 🔹 Barra de navegación
function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>
        Home
      </Link>
      <Link to="/dashboard" style={{ marginRight: "10px", color: "white" }}>
        Dashboard
      </Link>
      <Link to="/create-event" style={{ color: "white" }}>
        Crear Evento
      </Link>
    </nav>
  );
}

// 🔹 Formulario para crear eventos
function EventForm({ onAddEvent }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [salon, setSalon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !salon) return alert("Completa todos los campos");

    onAddEvent({ id: Date.now(), name, date, salon });
    setName("");
    setDate("");
    setSalon("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
    >
      <label>Nombre del Evento:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Fecha:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Salón:</label>
      <input
        type="text"
        value={salon}
        onChange={(e) => setSalon(e.target.value)}
      />

      <button type="submit" style={{ marginTop: "10px" }}>
        Crear Evento
      </button>
    </form>
  );
}

// 🔹 Lista de eventos
function EventList({ events }) {
  return (
    <div>
      <h2>Eventos Creados</h2>
      {events.length === 0 ? (
        <p>No hay eventos aún</p>
      ) : (
        <ul>
          {events.map((ev) => (
            <li key={ev.id}>
              <strong>{ev.name}</strong> - {ev.date} en {ev.salon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 🔹 Página Home
function Home() {
  return (
    <div className="container">
      <h1>Bienvenido al Organizador de Eventos.</h1>
    </div>
  );
}

// 🔹 Página Dashboard
function Dashboard({ events }) {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <EventList events={events} />
    </div>
  );
}

// 🔹 Página Crear Evento
function CreateEvent({ events, setEvents }) {
  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div>
      <h1>Crear Nuevo Evento</h1>
      <EventForm onAddEvent={handleAddEvent} />
      <EventList events={events} />
    </div>
  );
}

// 🔹 Componente principal
export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard events={events} />} />
        <Route
          path="/create-event"
          element={<CreateEvent events={events} setEvents={setEvents} />}
        />
      </Routes>
    </>
  );
}
