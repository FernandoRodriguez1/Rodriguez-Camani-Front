import "./ReviewList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../Theme/ThemeContext";
import React, { useEffect, useState, useContext } from "react";
import useTokenUser from "../../hooks/useTokenUser";
import api from "../../API/api-hook";

const AdminReviewList = () => {
  const { theme } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);
  const { tokenInfo, error: tokenError } = useTokenUser();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };
  const fetchAllReviews = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const response = await api.get(`Review/get-reviews`);
        if (response.data) {
          setReviews(response.data);
        } else {
          setReviews([]);
        }
      }
    } catch (error) {
      console.error("Error obteniendo reseñas:", error);
      setReviews([]);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await api.delete(`Review/delete-review/${reviewId}`);
      setReviews((reviews) => reviews.filter((r) => r.reviewId !== reviewId));
    } catch (error) {
      alert("Error eliminando la reseña:", error);
    }
  };

  useEffect(() => {
    if (tokenInfo) {
      fetchAllReviews();
    }
  }, [tokenInfo]);

  return (
    <div className={`ReviewItem ${theme}`}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <button
              onClick={() => handleDelete(review.reviewId)}
              className="button-delete"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <p className="review-description">Cliente: {review.userName}</p>
            <p className="review-date">
              Fecha de Creación: {formatDate(review.creationDate)}
            </p>
            <p className="review-description">
              Descripcion: {review.description}
            </p>
            <div className={`divider ${theme}`}></div>
          </div>
        ))
      ) : (
        <p>No hay reviews hechas.</p>
      )}
    </div>
  );
};
export default AdminReviewList;
