import { useContext, useEffect, useState } from "react";
import "./profilepage.css";

import useTokenUser from "../hooks/useTokenUser";
import api from "../API/api-hook";

import { ThemeContext } from "../Theme/ThemeContext";

import RedirectToLogin from "../../routes/RedirectToLogin";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import ReviewForm from "../appointments/UserAppointment/ReviewForm";

const Profilepage = () => {
  const [userData, setUserData] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { tokenInfo, error: tokenError } = useTokenUser();
  const [validations, setValidations] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const { theme, setTheme } = useContext(ThemeContext);

  const isFormValid = () => {
    return Object.values(validations).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const requestData = {
        passwordHash: newPassword,
      };
      try {
        if (tokenInfo && tokenInfo.sub) {
          const userId = tokenInfo.sub;

          await api.patch(`/User/change-password?id=${userId}`, requestData);
          toast.success("Se ha modificado tu contraseña correctamente.", {
            autoClose: 3000,
          });
          setNewPassword("");
        }
      } catch (error) {
        toast.error("Hubo un error al modificar tu contraseña.", {
          autoClose: 3000,
        });
      }
    } else {
      toast.error("La contraseña no cumple con todos los requisitos", {
        autoClose: 5000,
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    setValidations({
      minLength: value.length >= 8,
      maxLength: value.length <= 16,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
    });
  };

  const InfoByUser = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const userId = tokenInfo.sub;
        const name = tokenInfo.username;
        setUserName(name);
        const response = await api.get(`/User/get-user?id=${userId}`);
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error, no se pudo obtener información.", error);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      if (tokenInfo && tokenInfo.sub) {
        const idUser = tokenInfo.sub;

        const response = await api.get(
          `api/Appointment/get-appointment-by-userId/${idUser}`
        );
        setAppointments(response.data);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching appointments:", err);
    }
  };

  const handlePostReview = () => {
    setShowReviewForm(true);
  };

  useEffect(() => {
    if (tokenInfo) {
      InfoByUser();
      fetchAppointments(tokenInfo.sub);
    }
  }, [tokenInfo]);

  if (tokenError) {
    return <RedirectToLogin />;
  }

  return (
    <div className={`profile-container ${theme}`}>
      <form className={`formProfile ${theme}`} onSubmit={handleSubmit}>
        <h1 className="title-form">
          Bienvenido {userData.userName} puedes modificar tus credenciales
        </h1>

        <label>Ingrese su nueva contraseña</label>
        <input
          onChange={handlePasswordChange}
          type="password"
          className="input-form"
          value={newPassword}
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
        <button className="btn-form" type="submit" disabled={!isFormValid()}>
          Guardar cambios
        </button>
      </form>

      <h1 className="titles-appointments">Mis reservas</h1>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li
                key={appointment.appointmentId}
                className={`appointments-card ${theme}`}
              >
                <ul>
                  <li className="appointments-date-time">
                    Fecha y Hora: {appointment.dateTime}
                    <br />
                    {appointment.startTime}
                  </li>
                  <li className="appointments-barber">
                    Barbero: {appointment.barberId}
                  </li>
                  <li className="appointments-service">
                    Tipo de corte: {appointment.service}
                  </li>
                  {!appointment.reviewId ? (
                    <button
                      className="submit-review-button"
                      onClick={handlePostReview}
                    >
                      DEJA TU REVIEW
                    </button>
                  ) : (
                    ""
                  )}

                  {showReviewForm && (
                    <ReviewForm
                      userName={userName}
                      clientId={appointment.clientId}
                      service={appointment.service}
                      appointmentId={appointment.appointmentId}
                    />
                  )}
                </ul>
              </li>
            ))
          ) : (
            <h1>
              Aún no tienes reservas realizadas. Haga su primera reserva{" "}
              <Link to="/appointment">aquí</Link>!
            </h1>
          )}
        </ul>
      )}

      <ToastContainer />
    </div>
  );
};

export default Profilepage;
