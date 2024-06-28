import { Link } from "react-router-dom";

import "./Dashboard.css";

import GaleryPhotosPage from "../galery-photos/galery-photos";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>TEGOBI'S</h1>
      <p>
        Hola, somos Tegobi's, un grupo de peluqueros asociados con más de 10
        años de experiencia.
      </p>
      <h4>Algunos de nuestros trabajos</h4>
      <GaleryPhotosPage />
      <br />
      <br />

      <Link to="/appointment" className="link-ref">
        Quiero agendar un turno
      </Link>
      <br></br>
      <br></br>
    </div>
  );
};

export default Dashboard;
