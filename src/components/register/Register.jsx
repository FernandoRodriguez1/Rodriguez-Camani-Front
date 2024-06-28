import { useContext, useState } from "react";

import "./Register.css";
import { ThemeContext } from "../Theme/ThemeContext";
import useAddUser from "../management/users/HttpAddUsers";

const Register = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [validations, setValidations] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const {
    username,
    setUsername,
    password,
    setPassword,
    age,
    setAge,
    email,
    setEmail,
    phonenumber,
    setPhonenumber,
    addUser,
    error,
  } = useAddUser();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setValidations({
      minLength: value.length >= 8,
      maxLength: value.length <= 16,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser();
  };

  return (
    <div className={`registro-form-container ${theme}`}>
      <form onSubmit={handleSubmit} className="registro-form">
        <h2>Registro</h2>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            className="input-field"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Edad:</label>
          <input
            className="input-field"
            type="number"
            id="add-age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Numero de Telefono:</label>
          <input
            className="input-field"
            type="number"
            id="add-number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="input-field"
            type="email"
            id="add-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            className="input-field"
            value={password}
          />
          <ul className="password-requirements">
            <li className={validations.minLength ? "valid" : ""}>
              Al menos 8 caracteres.
            </li>
            <li className={validations.maxLength ? "valid" : ""}>
              Máximo 16 caracteres.
            </li>
            <li className={validations.uppercase ? "valid" : ""}>
              Por lo menos una mayúscula.
            </li>
            <li className={validations.lowercase ? "valid" : ""}>
              Por lo menos una minúscula.
            </li>
            <li className={validations.number ? "valid" : ""}>
              Deberá contar con al menos un número.
            </li>
          </ul>
        </div>
        {error && <p>Error: {error.message}</p>}
        <button type="submit" className="button-form">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
