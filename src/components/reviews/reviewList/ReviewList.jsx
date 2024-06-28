import "./ReviewList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

  const fetchReviews = async () => {
    try {
      if (tokenInfo && tokenInfo.sub) {
        const userId = tokenInfo.sub;
        setAdmin(userId);

        const response = await api.get(
          `Review/get-reviews-by-userId/${userId}`
        );
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

  const handleDelete = () => {
    // Implementación para borrar una reseña
  };

  useEffect(() => {
    if (tokenInfo) {
      fetchReviews();
    }
  }, [tokenInfo]);

  return (
    <div className="ReviewList">
      {admin === "1" ? (
        <AdminReviewList />
      ) : (
        <div className="ReviewItem">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p>{review.Description}</p>
                <p>{review.CreationDate}</p>
                <button onClick={handleDelete} className="button-delete">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ))
          ) : (
            <p>No tienes reviews hechas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
