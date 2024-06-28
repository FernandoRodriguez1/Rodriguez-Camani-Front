import React from "react";
import ScheduleList from "../schedule/ScheduleList";
import ScheduleForm from "../schedule/ScheduleForm";

function BarberComponent() {
  return (
    <div className="barber-comp-container">
      <ScheduleList />
      <h2 className="subtitle-barber">Horarios para mi proxima semana</h2>
      <ScheduleForm />
    </div>
  );
}

export default BarberComponent;
