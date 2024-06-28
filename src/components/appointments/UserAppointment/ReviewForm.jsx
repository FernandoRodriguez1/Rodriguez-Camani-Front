import React, { useState } from "react";
import api from "../../API/api-hook";
function ReviewForm({ user, appointmentId }) {
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addReviewPost();
  };

  const addReviewPost = async () => {
    const reviewData = {
      userName: user,
      description: review,
      appointment: appointmentId,
    };

    try {
      await api.post("Review/add-review", reviewData);
      alert("¡Se ha creado la reseña correctamente! Muchísimas gracias.");
      setReview("");
    } catch (error) {
      console.error("Error agregando reseña:", error);
      setError(error);
      alert("No se pudo crear la reseña.");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="addreview-form">
        <label className="label-userform">Reseña</label>
        <textarea
          className="input-field-userform"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <button type="submit">Enviar reseña</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default ReviewForm;
