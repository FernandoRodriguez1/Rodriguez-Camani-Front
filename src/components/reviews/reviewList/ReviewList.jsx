import "./ReviewList.css";
import { ThemeContext } from "../../Theme/ThemeContext";
import React, { useEffect, useState, useContext } from "react";
import useTokenUser from "../../hooks/useTokenUser";
import api from "../../API/api-hook";
import AdminReviewList from "./AdminReviewList";

const ReviewList = () => {
  const { theme } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);
  const { tokenInfo, error: tokenError } = useTokenUser();
  const [admin, setAdmin] = useState("");

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

  const fetchReviews = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const userId = tokenInfo.sub;
        setAdmin(userId);
      }

      const response = await api.get(`Review/get-reviews`);
      if (response.data) {
        setReviews(response.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error obteniendo reseñas:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tokenInfo]);

  return (
    <div className={`ReviewList ${theme}`}>
      {admin === "1" ? (
        <AdminReviewList reviews={reviews} />
      ) : (
        <div className={`ReviewItem ${theme}`}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review-description">
                  Descripcion: {review.description}
                </p>
                <p className="review-date">
                  Fecha de Creación: {formatDate(review.creationDate)}
                </p>
                <div className={`divider ${theme}`}></div>
              </div>
            ))
          ) : (
            <p className="review-description">No hay hechas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
