import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeContext";
import Register from "../register/Register";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(userName, password);
    if (result.success) {
      await new Promise((a) => setTimeout(a, 2000));
      navigate("/");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className={`container-regilogi ${theme}`}>
      <div className={`card-regilogi ${isLoginComponent ? "" : "flipped"}`}>
        <div className="front">
          <div className={`registro-form-container ${theme}`}>
            <form onSubmit={handleLogin} className="registro-form">
              <h2>Iniciar sesión</h2>
              <div className="form-group">
                <label htmlFor="login-username">Username</label>
                <input
                  className="input-field"
                  type="text"
                  id="login-username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  className="input-field"
                  type="password"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message">
                  Error: No se ha podido iniciar sesión.
                </div>
              )}
              <button
                type="submit"
                className="button-form"
                data-testid="login-button"
              >
                Iniciar sesión
              </button>
              <p>
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginComponent(false)}
                  className="link"
                >
                  Registrarse
                </button>
              </p>
            </form>
          </div>
        </div>
        <div className="back">
          <Register />
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => setIsLoginComponent(true)}
              className="link"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
