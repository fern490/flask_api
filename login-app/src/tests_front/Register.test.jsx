import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register.jsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), {
      target: { value: "Perez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nombre de usuario"), {
      target: { value: "juanperez123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    
    const dateInput = document.querySelector('input[name="fecha_nacimiento"]');
    fireEvent.change(dateInput, { target: { value: "2000-01-01" } });

    const generoSelect = document.querySelector('select[name="genero"]');
    fireEvent.change(generoSelect, { target: { value: "Hombre" } });
    
    const roleSelect = document.querySelector('select[name="rol"]');
    fireEvent.change(roleSelect, { target: { value: "cliente" } });
  };

  it("renderiza el formulario correctamente", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText("Crear una cuenta")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("muestra error si faltan campos obligatorios", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Registrarse");
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("Por favor, completa todos los campos.")
    ).toBeInTheDocument();
    
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("envía los datos correctamente cuando el formulario está completo", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Usuario creado" }),
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fillForm();

    const submitBtn = screen.getByText("Registrarse");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:5000/usuarios",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining('"nombre":"Juan"'),
        })
      );
    });

    expect(
      await screen.findByText("Usuario registrado correctamente. Ya puedes iniciar sesión.")
    ).toBeInTheDocument();
  });

  it("muestra error si el servidor falla (ej: usuario duplicado)", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "El nombre de usuario ya existe" }),
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fillForm();

    const submitBtn = screen.getByText("Registrarse");
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("El nombre de usuario ya existe")
    ).toBeInTheDocument();
  });

  it("navega al login al hacer click en 'Ya tenés una cuenta'", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginBtn = screen.getByText("¿Ya tenés una cuenta? Iniciá sesión");
    fireEvent.click(loginBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
