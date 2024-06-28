import React, { useState } from "react";
import useAddBarber from "./HttpAddBarber";
import "./AddBarberForm.css";

const AddBarberForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    addBarber,
    error,
  } = useAddBarber();

  const onSubmit = async (e) => {
    e.preventDefault();
    await addBarber();
  };

  return (
    <div className="container-userform">
      <div className="card-form-users">
        <h1>Agregar Barberos nuevos</h1>
        <form onSubmit={onSubmit} className="adduser-form">
          <div className="form-group-userform">
            <label className="label-userform">Username</label>
            <input
              className="input-field-userform"
              type="text"
              id="add-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="label-userform">Email</label>
            <input
              className="input-field-userform"
              type="email"
              id="add-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group-userform">
            <label className="label-userform">Contraseña</label>
            <input
              className="input-field-userform"
              type="password"
              id="add-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>Error: {error.message}</p>}
          <button type="submit" className="button-form">
            Agregar Barbero
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBarberForm;
