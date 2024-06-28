import React, { useContext, useState } from "react";
import "./ScheduleForm.css";
import { ThemeContext } from "../Theme/ThemeContext";
import api from "../API/api-hook";
import useTokenUser from "../hooks/useTokenUser";

const daysOfWeek = [
  { name: "Tuesday", index: 1 },
  { name: "Wednesday", index: 2 },
  { name: "Thursday", index: 3 },
  { name: "Friday", index: 4 },
  { name: "Saturday", index: 5 },
  { name: "Sunday", index: 6 },
];

const ScheduleForm = () => {
  const { tokenInfo, error: tokenError } = useTokenUser();
  const { theme } = useContext(ThemeContext);
  const initialSchedule = daysOfWeek.reduce((acc, day) => {
    acc[day.name] = { startTime: "09:00", endTime: "17:00", isAvailable: true };
    return acc;
  }, {});

  const [schedule, setSchedule] = useState(initialSchedule);

  const handleChange = (day, field, value) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const barberId = tokenInfo.sub;

    const availabilitySlots = daysOfWeek.map((day) => ({
      dayOfTheWeek: day.index,
      startTime: `${schedule[day.name].startTime}:00`,
      endTime: `${schedule[day.name].endTime}:00`,
      isAvailable: schedule[day.name].isAvailable,
    }));

    const barberScheduleDTO = {
      barberId: barberId,
      currentYear: 2024,
      availabilitySlots: availabilitySlots,
    };

    try {
      const response = await api.post(
        `/api/BarberSchedules/${barberId}/schedules`,
        barberScheduleDTO
      );

      alert("Horario Creado con exito");
    } catch (error) {
      alert("No se pudo crear el horario:", error);
    }
  };

  return (
    <div className={`schedule-form-container ${theme}`}>
      <h2>Formulario de Horario</h2>
      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="days-container">
          {daysOfWeek.map((day) => (
            <div key={day.name} className="schedule-group">
              <h3>{day.name}</h3>
              <label>
                Hora de Inicio:
                <input
                  type="time"
                  value={schedule[day.name].startTime}
                  onChange={(e) =>
                    handleChange(day.name, "startTime", e.target.value)
                  }
                  className="schedule-input-field"
                />
              </label>
              <br />
              <label>
                Hora de Fin:
                <input
                  type="time"
                  value={schedule[day.name].endTime}
                  onChange={(e) =>
                    handleChange(day.name, "endTime", e.target.value)
                  }
                  className="schedule-input-field"
                />
              </label>
              <br />
              <label>
                Disponible:
                <input
                  type="checkbox"
                  checked={schedule[day.name].isAvailable}
                  onChange={(e) =>
                    handleChange(day.name, "isAvailable", e.target.checked)
                  }
                />
              </label>
              <br />
            </div>
          ))}
        </div>
        <button type="submit" className="schedule-form-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ScheduleForm;
