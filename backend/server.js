const express = require("express");
const cors = require("cors");

const app = express();

// Permitir solicitudes desde React
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Base de datos temporal en memoria
let users = [
  { email: "admin@test.com", password: "1234", role: "admin" }
];

// Endpoint para registrar usuario
app.post("/usuarios", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y password son obligatorios" });
  }

  // Verificar que no exista
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const newUser = { email, password, role: role || "user" };
  users.push(newUser);

  return res.status(201).json({ message: "Usuario creado", user: newUser });
});

// Endpoint de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return res.json({
      token: "fake-jwt-token",
      role: user.role
    });
  } else {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
});

app.listen(4000, () => {
  console.log("Servidor backend corriendo en http://localhost:4000");
});
