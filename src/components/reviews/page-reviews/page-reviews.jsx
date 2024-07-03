import "./PageReviews.css";
import ReviewList from "./../reviewList/ReviewList";
import { useContext } from "react";
import { ThemeContext } from "../../Theme/ThemeContext";

const PageReviews = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`PageReviews ${theme}`}>
      <h1>Reseñas realizadas a nuestros trabajos.</h1>
      <ReviewList />
    </div>
  );
};

export default PageReviews;
