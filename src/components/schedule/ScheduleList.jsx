import React, { useEffect, useState, useContext } from "react";
import "./ScheduleList.css";
import { ThemeContext } from "../Theme/ThemeContext";
import useTokenUser from "../hooks/useTokenUser";
import api from "../API/api-hook";
import { ToastContainer, toast } from "react-toastify";
const ScheduleList = () => {
  const { theme } = useContext(ThemeContext);
  const [schedules, setSchedules] = useState([]);
  const { tokenInfo, error: tokenError } = useTokenUser();

  const fetchSchedules = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const barberId = tokenInfo.sub;
        const response = await api.get(
          `/api/BarberSchedules/${barberId}/schedules`
        );
        if (response.data.availabilitySlots) {
          setSchedules([response.data]);
        } else {
          setSchedules([]);
        }
      }
    } catch (error) {
      setSchedules([]);
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const barberId = tokenInfo.sub;
        const response = await api.delete(
          `/api/BarberSchedules/${barberId}/schedules`
        );
        toast.success("Horarios eliminados");
      }
    } catch (error) {
      toast.error("Error eliminando el horario:", { autoClose: 3000 });
    }
  };
  useEffect(() => {
    if (tokenInfo) {
      fetchSchedules();
    }
  }, [tokenInfo]);

  return (
    <div className={`schedule-display-container ${theme}`}>
      <h2>Horarios del Barbero</h2>
      <div className="schedules-container">
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className={`schedule-card ${theme}`}>
              <div className="slots-container">
                {schedule.availabilitySlots.map((slot, slotIndex) => (
                  <div key={slotIndex} className={`slot-card ${theme}`}>
                    <p>Día de la Semana: {slot.dayOfTheWeek}</p>
                    <p>Hora de Inicio: {slot.startTime}</p>
                    <p>Hora de Fin: {slot.endTime}</p>
                    <p>Disponible: {slot.isAvailable ? "Sí" : "No"}</p>
                  </div>
                ))}
                <button
                  className="delete-button"
                  onClick={handleDeleteSchedule}
                >
                  Eliminar Horario
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron horarios.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ScheduleList;
