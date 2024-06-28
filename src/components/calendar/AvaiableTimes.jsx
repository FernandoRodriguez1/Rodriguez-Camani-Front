import React from "react";

const AvailableTimes = ({ selectedDate, availableTimes, theme }) => {
  const renderAvailableTimes = () => {
    return availableTimes.length > 0 ? (
      availableTimes.map((time, index) => (
        <div key={index} className={`time-slot ${theme}`}>
          <p>Hora de Inicio: {time.startTime}</p>
          <p>Hora de Fin: {time.endTime}</p>
          <p>Disponible: {time.isAvailable ? "Sí" : "No"}</p>
        </div>
      ))
    ) : (
      <p>No hay horarios disponibles para este día.</p>
    );
  };

  return (
    <div className="available-times-container">
      {selectedDate && (
        <>
          <h3>Horarios Disponibles para {selectedDate.toDateString()}</h3>
          {renderAvailableTimes()}
        </>
      )}
    </div>
  );
};

export default AvailableTimes;
