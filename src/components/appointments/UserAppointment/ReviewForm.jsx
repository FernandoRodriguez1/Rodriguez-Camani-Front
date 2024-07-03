import React, { useState } from "react";
import api from "../../API/api-hook";
import { toast } from "react-toastify";
import "./ReviewForm.css";

const ReviewForm = ({ clientId, userName, service, appointmentId }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [ratingg, setRatingg] = useState(1);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addReviewPost();
  };

  const addReviewPost = async () => {
    const dateTime = new Date().toISOString();
    const reviewData = {
      appointment: appointmentId,
      userId: clientId,
      userName: userName,
      rating: ratingg,
      description: description,
      creationDate: dateTime,
      service: service,
    };
    try {
      await api.post(`Review/add-review?idTurno=${appointmentId}`, reviewData);
      toast.success(
        "¡Se ha creado la reseña correctamente! Muchísimas gracias."
      );
    } catch (error) {
      setError(error);
      toast.error("No se pudo crear la reseña.");
    }
  };

  const handleRatingChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 1) {
      value = 1;
    } else if (value > 5) {
      value = 5;
    }
    setRatingg(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="addreview-form">
        <label className="addreview-form label-userform">Reseña</label>
        <textarea
          className="addreview-form input-field-userform"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="addreview-form">Agregue su valoracion (1-5)</label>
        <input
          type="number"
          className="addreview-form"
          value={ratingg}
          min={1}
          max={5}
          onChange={handleRatingChange}
          required
        />
        <button type="submit">Enviar reseña</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ReviewForm;
