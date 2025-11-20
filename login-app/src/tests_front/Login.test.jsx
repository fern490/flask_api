import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

describe("Login.jsx", () => {
  beforeEach(() => {
    fetch.mockReset();
    sessionStorage.clear();
  });

  it("muestra error si falta un campo", async () => {
    render(
      <BrowserRouter>
        <Login onLoginSuccess={() => {}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(screen.getByText(/faltan campos/i)).toBeInTheDocument();
    });
  });

  it("envía credenciales con fetch correctamente", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          token: "abc123",
          role: "cliente",
          user_id: 55
        })
    });

    const mockSuccess = vi.fn();

    render(
      <BrowserRouter>
        <Login onLoginSuccess={mockSuccess} />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Correo electrónico o nombre de usuario"),
      { target: { value: "test@mail.com" } }
    );

    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "1234" }
    });

    fireEvent.click(screen.getByDisplayValue("cliente"));
    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:5000/login",
        expect.any(Object)
      );
    });

    expect(sessionStorage.getItem("token")).toBe("abc123");
    expect(sessionStorage.getItem("userRole")).toBe("cliente");
    expect(sessionStorage.getItem("userId")).toBe("55");

    expect(mockSuccess).toHaveBeenCalledWith("cliente");
  });
});
