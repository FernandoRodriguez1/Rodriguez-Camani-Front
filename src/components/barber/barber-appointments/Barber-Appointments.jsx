import { ThemeContext } from "../../Theme/ThemeContext";
import React, { useEffect, useContext, useState } from "react";
import useTokenUser from "../../hooks/useTokenUser";
import api from "../../API/api-hook";
import "./BarberAppointmentList.css";
const BarberAppointmentList = () => {
  const { theme } = useContext(ThemeContext);
  const { tokenInfo, error: tokenError } = useTokenUser();
  const [appointments, setAppointments] = useState([]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const fetchAppointments = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const userId = tokenInfo.sub;
        const response = await api.get(
          `/api/Appointment/barber-appointments?barberId=${userId}`
        );
        if (response.data) {
          setAppointments(response.data);
        } else {
          setAppointments([]);
        }
      }
    } catch (error) {
      console.error("Error obteniendo reseñas:", error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (tokenInfo) {
      fetchAppointments();
    }
  }, [tokenInfo]);

  return (
    <div className={`barber-list ${theme}`}>
      <div className={`ReviewItem ${theme}`}>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div key={index} className="review">
              <p className="review-description">
                Servicio: {appointment.service}
              </p>
              <p className="review-date">Horario: {appointment.startTime}</p>
              <div className={`divider ${theme}`}></div>
            </div>
          ))
        ) : (
          <p>No hay hechas.</p>
        )}
      </div>
    </div>
  );
};

export default BarberAppointmentList;
