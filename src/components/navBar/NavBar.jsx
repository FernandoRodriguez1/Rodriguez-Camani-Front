import { useContext, useState } from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ToggleTheme from "../ui/ToggleTheme";
import { AuthContext } from "../AuthProvider/AuthProvider";
import logo from "./../Photos/Tegobi´s.png";
import logoDark from "./../Photos/Tegobi´sDark.png";

const NavBar = ({ theme }) => {
  const { isLoggedIn, roles } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`navbar ${theme}`}>
      <Link to="/" className="title">
        {theme === "light" ? (
          <img src={logo} alt="" height="70px" width="100px" />
        ) : (
          <img src={logoDark} alt="" height="70px" width="100px" />
        )}
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <ToggleTheme />
        {roles == "Admin" ? (
          <li>
            <NavLink to="/users">Manejo Usuarios</NavLink>
          </li>
        ) : (
          ""
        )}
        {roles == "Barber" ? (
          <li>
            <NavLink to="/schedule">Mis Horarios</NavLink>
          </li>
        ) : (
          ""
        )}
        {roles == "Barber" ? (
          <li>
            <NavLink to="/barber-appointment">Mis turnos</NavLink>
          </li>
        ) : (
          ""
        )}

        <li>
          <NavLink to="/">Nosotros</NavLink>
        </li>
        {roles == "Client" ? (
          <li>
            <NavLink to="/editprofile">Editar Perfil</NavLink>
          </li>
        ) : (
          ""
        )}
        {roles == "Client" ? (
          <li>
            <NavLink to="/appointment">Turnos</NavLink>
          </li>
        ) : (
          ""
        )}

        <li>
          <NavLink to="/reviews">Reseñas</NavLink>
        </li>

        {isLoggedIn ? (
          <button className={`button-navbar-logout ${theme}`} onClick={logout}>
            Cerrar Sesion
          </button>
        ) : (
          ""
        )}
        {!isLoggedIn ? (
          <li>
            <NavLink to="/login">Iniciar Sesion</NavLink>{" "}
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
NavBar.propTypes = {
  theme: PropTypes.string.isRequired,
};
export default NavBar;
