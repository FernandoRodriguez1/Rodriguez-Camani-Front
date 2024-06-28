import { useEffect, useState } from "react";
import api from "../../API/api-hook";
const GetAllAppointments = (userId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `Review/get-reviews-by-userId/${userId}`
        );

        const completedAppointments = response.data.filter(
          (appointment) => appointment.completed
        );

        setAppointments(completedAppointments);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching appointments:", err);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return { appointments, loading, error };
};

export default GetAllAppointments;
