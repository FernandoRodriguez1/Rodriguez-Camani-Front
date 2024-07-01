import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserListsAppointments = ({ appointments = [] }) => {
  return (
    <ul>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <li key={appointment.id}>
            <ul>
              <li>
                Fecha y Hora: {appointment.creationDate}
                {}
              </li>
              <li>Barbero: {appointment.barberId}</li>
              <li>Tipo de corte: {appointment.service}</li>
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
  );
};

export default UserListsAppointments;
