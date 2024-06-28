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
    fetchAllReviews();
  }, []);

  return (
    <div className="ReviewList">
      <h1>ADMIN VIEW</h1>
      <div className="ReviewItem">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review.ClientUsername}</p>
              <p>{review.CreationDate}</p>
              <p>{review.ClientComment}</p>
              <p>{review.AppointmentId}</p>
              <button
                onClick={() => handleDelete(review.reviewId)}
                className="button-delete"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))
        ) : (
          <p>No hay reviews hechas.</p>
        )}
      </div>
    </div>
  );
};
export default AdminReviewList;
