import { Link } from "react-router-dom";
import "./NotFound.css";
import { ThemeContext } from "../components/Theme/ThemeContext";
import { useContext } from "react";
const NotFound = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`not-found-container ${theme}`}>
      <h1>Error, página no encontrada, por favor vuelva al inicio.</h1>
      <h1>
        Volver al <Link to="/">inicio</Link>
      </h1>
    </div>
  );
};

export default NotFound;
