import { describe, it, expect } from "vitest";
import Login from "./Login";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginFormMockError } from "./LoginFormMockup";

describe("Login", () => {
  it("Verificar que hay dos inputs y un button.", () => {
    render(<Login />);

    const inputEmail = screen.getByLabelText(/email/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByLabelText(/contraseña/i);
    expect(inputPassword).toBeInTheDocument();

    const buttonForm = screen.getByRole("button", { name: /iniciar sesión/i });
    expect(buttonForm).toBeInTheDocument();
  });
});

describe("Login", () => {
  it("Comprobar que arroje un mensaje de error cuando ingresa mal la contraseña y/o el email.", async () => {
    render(<Login />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);
    const buttonSubmit = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    await userEvent.type(inputEmail, LoginFormMockError.email);
    await userEvent.type(inputPassword, LoginFormMockError.password);

    await userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(inputEmail).toHaveValue(LoginFormMockError.email);
      expect(inputPassword).toHaveValue(LoginFormMockError.password);

      const errorMessage = screen.getByText(
        /error: email o contraseña incorrectos/i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
