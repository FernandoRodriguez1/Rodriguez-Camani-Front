import React, { useContext, useState, useEffect } from "react";
import "./CreateAppointment.css";
import { ThemeContext } from "../../Theme/ThemeContext";
import Calendar from "../../calendar/Calendar";
import AvailableTimes from "../../calendar/AvaiableTimes";
import api from "../../API/api-hook";
import useTokenUser from "../../hooks/useTokenUser";
import { formatISO, parseISO, format } from "date-fns";

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [product, setProduct] = useState("");
  const [barberId, setBarberId] = useState("");
  const [clientId, setClientId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { tokenInfo, error: tokenError } = useTokenUser();

  const newAppointment = {
    clientId: clientId,
    barberId: barberId,
    barberAvailabilityId: 1,
    service: product,
    startTime: `${hour}:00`,
    creationDate: formatISO(new Date(selectedDate)),
  };

  console.log(newAppointment);

  const fetchSchedules = async (barberId) => {
    try {
      const response = await api.get(
        `/api/BarberSchedules/${barberId}/schedules`
      );
      if (response.data.availabilitySlots) {
        setSchedules(response.data.availabilitySlots);
      } else {
        console.error("API response is not an array:", response.data);
        setSchedules([]);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setSchedules([]);
    }
  };

  const CreateAppointment = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const userId = tokenInfo.sub;
        setClientId(userId);
        await api.post(`api/Appointment/create-appointment?`, newAppointment);
        alert("Se reservado el turno correctamente.");

        setBarberId("");
        setHour("");
        setProduct("");
      }
    } catch (error) {
      alert("Error al reservar turno.");
    }
  };

  useEffect(() => {
    if (selectedDate && schedules.length > 0) {
      const dayMapping = [6, 0, 1, 2, 3, 4, 5];
      const dayOfTheWeek = dayMapping[selectedDate.getDay()];
      const times = schedules
        .filter((slot) => slot.dayOfTheWeek === dayOfTheWeek)
        .map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: slot.isAvailable,
        }));
      setAvailableTimes(times);
    }
  }, [selectedDate, schedules]);

  useEffect(() => {
    if (tokenInfo) {
      setClientId(tokenInfo.sub);
    }
  }, [tokenInfo]);

  const generateTimeSlots = (start, end, interval = 60) => {
    const startTime = new Date(`1970-01-01T${start}Z`);
    const endTime = new Date(`1970-01-01T${end}Z`);
    const times = [];
    while (startTime <= endTime) {
      times.push(startTime.toISOString().substring(11, 16));
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    return times;
  };

  const availableHours =
    selectedDate && availableTimes.length > 0
      ? generateTimeSlots(
          availableTimes[0].startTime,
          availableTimes[0].endTime
        )
      : [];

  return (
    <div className={`form-container-appointment ${theme}`}>
      <h3>Reserva de turno</h3>
      <div>
        <label>Seleccionar barbero:</label>
        <select
          className="select-field"
          value={barberId}
          onChange={(e) => {
            setBarberId(e.target.value);
            fetchSchedules(e.target.value);
            setSelectedDate(null);
            setAvailableTimes([]);
          }}
        >
          <option value="">Seleccione un barbero</option>
          <option value="1">Barbero 1</option>
          <option value="2">Barbero 2</option>
        </select>
      </div>
      <div>
        <label>Fecha:</label>
        <Calendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          disabled={!barberId}
        />
      </div>
      <AvailableTimes
        selectedDate={selectedDate}
        availableTimes={availableTimes}
        theme={theme}
      />
      <div>
        <label>Hora:</label>
        <input
          className="input-field"
          type="time"
          list="time-options"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          disabled={!selectedDate}
        />
        <datalist id="time-options">
          {availableHours.map((time, index) => (
            <option key={index} value={time} />
          ))}
        </datalist>
      </div>
      <div>
        <label>Seleccionar servicio:</label>
        <select
          className="select-field"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          disabled={!hour}
        >
          <option value="">Seleccione un servicio</option>
          <option value="Corte normal">Corte normal ($5000)</option>
          <option value="Corte con barba">Corte con barba ($7500)</option>
          <option value="Mechas">Mechas ($9500)</option>
          <option value="Color completo">Color completo ($11000)</option>
        </select>
      </div>
      <div></div>
      <button
        className="submit-button"
        onClick={CreateAppointment}
        disabled={!product}
      >
        Reservar turno
      </button>
    </div>
  );
};

export default AppointmentForm;
