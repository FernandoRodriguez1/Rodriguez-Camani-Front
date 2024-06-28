import "./PageReviews.css";
import ReviewList from "./../reviewList/ReviewList";

const PageReviews = () => {
  return (
    <div className="PageReviews">
      <h1>Reseñas realizadas a nuestros trabajos.</h1>
      <ReviewList />
    </div>
  );
};

export default PageReviews;
