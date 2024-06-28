import React, { useEffect, useState } from "react";
import UserListsAppointments from "./UserListsAppointment";
import GetAllAppointments from "./GetAllAppointments";

const UsersAppointment = ({ userId }) => {
  const { appointments, loading, error } = GetAllAppointments(userId);
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setCompletedAppointments(appointments);
    }
  }, [appointments, loading, error]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <UserListsAppointments appointments={completedAppointments} />
    </div>
  );
};

export default UsersAppointment;
