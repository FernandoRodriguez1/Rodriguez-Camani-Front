import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const UserListsAppointments = ({ appointments = [] }) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const toggleReviewForm = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  return (
    <ul>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <li key={appointment.id}>
            <ul>
              <li>Fecha y Hora: {appointment.date}</li>
              <li>Barbero: {appointment.barber}</li>
              <li>Tipo de corte: {appointment.type}</li>
              <li>
                <button onClick={() => toggleReviewForm(appointment.id)}>
                  Dejar una reseña
                </button>
              </li>
            </ul>
            {selectedAppointmentId === appointment.id && (
              <ReviewForm
                appointmentId={appointment.id}
                user={appointment.user}
              />
            )}
          </li>
        ))
      ) : (
        <h1>
          Aún no tienes reservas realizadas. Haga su primera reserva{" "}
          <Link to="/appointment">aquí</Link>!
        </h1>
      )}
    </ul>
  );
};

export default UserListsAppointments;
