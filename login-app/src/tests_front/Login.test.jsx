import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "../pages/Login";

describe("Login Component", () => {
  let onLoginSuccess;
  let onRegisterClick;

  beforeEach(() => {
    onLoginSuccess = vi.fn();
    onRegisterClick = vi.fn();

    window.sessionStorage.clear();
    global.fetch = vi.fn();
  });

  test("renderiza el formulario de inicio de sesión", () => {
    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  test("permite escribir email y password", () => {
    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "123456" },
    });

    expect(screen.getByPlaceholderText(/Correo/i).value).toBe("test@example.com");
    expect(screen.getByPlaceholderText(/Contraseña/i).value).toBe("123456");
  });

  test("muestra error si no se selecciona un rol", async () => {
    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: "user@demo.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText(/Entrar/i));

    expect(await screen.findByText(/completa todos los campos/i)).toBeInTheDocument();
  });

  test("envía el formulario correctamente y ejecuta onLoginSuccess", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: "abc123",
        role: "cliente",
        user_id: "10",
      }),
    });

    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: "user@demo.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByLabelText(/Cliente/i));
    fireEvent.click(screen.getByText(/Entrar/i));

    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledWith("cliente");
    });

    expect(sessionStorage.getItem("token")).toBe("abc123");
    expect(sessionStorage.getItem("userRole")).toBe("cliente");
    expect(sessionStorage.getItem("userId")).toBe("10");
  });

  test("muestra mensaje de error cuando las credenciales son inválidas", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Credenciales inválidas" }),
    });

    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByLabelText(/Cliente/i));
    fireEvent.click(screen.getByText(/Entrar/i));

    expect(await screen.findByText(/Credenciales inválidas/i)).toBeInTheDocument();
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });

  test("ejecuta onRegisterClick cuando se hace clic en Registrarse", () => {
    render(<Login onLoginSuccess={onLoginSuccess} onRegisterClick={onRegisterClick} />);

    fireEvent.click(screen.getByText(/Registrarse/i));

    expect(onRegisterClick).toHaveBeenCalled();
  });
});
