import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../AuthProvider/AuthProvider";
import { ThemeContextProvider } from "../Theme/ThemeContext";

// se hace un mock del authcontext, para que se pueda
// simular el comportamiento del mismo sin depender de la implementacion real digamos.

const mockAuthContext = {
  login: vi
    .fn()
    .mockResolvedValue({ success: false, message: "Error al iniciar sesión." }),
  isLoggedIn: false, //isLoggedIn: Un booleano que indica si el usuario está o no logueado. En este caso, es false.
  logout: vi.fn(), //logout: simula el comportamiento cuando cierra sesion o logout.
  roles: null, //roles: Inicialmente null, simula los roles del usuario.

  //login: Es una función mock que devuelve una promesa resuelta con un objeto que indica un fallo
  //en el inicio de sesión. vi.fn() es una función de Vitest para crear mocks.
};

const renderWithProviders = (
  ui,
  { authProviderProps, themeProviderProps, ...renderOptions } = {}
  //renderWithProviders es una función helper que se utiliza para renderizar un componente
  //con los contextos necesarios para la prueba (AuthProvider y ThemeContextProvider).
  //También envuelve el componente en MemoryRouter para proporcionar el contexto de enrutamiento necesario para el hook useNavigate.
) => {
  return render(
    <MemoryRouter>
      <AuthProvider {...authProviderProps}>
        <ThemeContextProvider {...themeProviderProps}>
          {ui}
        </ThemeContextProvider>
      </AuthProvider>
    </MemoryRouter>,
    renderOptions
  );
  //ui: El componente de React, en este caso utilizamos Login.
  //authProviderProps y themeProviderProps: Props opcionales que pueden ser pasados a los proveedores AuthProvider y ThemeContextProvider
  //renderOptions: Otras opciones que pueden ser pasadas a la función render de @testing-library/react.
};

describe("Login", () => {
  it("Verificar que hay dos inputs y un button.", () => {
    renderWithProviders(<Login />);

    const inputUsername = screen.getByLabelText(/username/i);
    expect(inputUsername).toBeInTheDocument();

    const inputPassword = screen.getByLabelText(/contraseña/i);
    expect(inputPassword).toBeInTheDocument();

    const buttonForm = screen.getByTestId("login-button");
    expect(buttonForm).toBeInTheDocument();
  });

  it("Comprobar que arroje un mensaje de error cuando ingresa mal la contraseña y/o el email.", async () => {
    renderWithProviders(<Login />, {
      authProviderProps: { value: mockAuthContext },
    });

    const inputUsername = screen.getByLabelText(/username/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);
    const buttonSubmit = screen.getByTestId("login-button");

    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    await userEvent.type(inputUsername, "wrongusername");
    await userEvent.type(inputPassword, "wrongpassword");

    await userEvent.click(buttonSubmit);

    await waitFor(() => {
      const errorMessage = screen.getByText(/error al iniciar sesión/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
