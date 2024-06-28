import { Link } from "react-router-dom";
import "./RedirectToLogin.css";
import { ThemeContext } from "../components/Theme/ThemeContext";
import { useContext } from "react";
const RedirectToLogin = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`redirect-tologin-container ${theme}`}>
      <br></br>
      <h1>
        No has iniciado sesion, por favor redirigete a Login/Register para
        iniciar o crear una nueva sesion.
      </h1>
      <h1>
        Inicia sesion <Link to="/login">aquí</Link>
      </h1>
      <br></br>
    </div>
  );
};

export default RedirectToLogin;
