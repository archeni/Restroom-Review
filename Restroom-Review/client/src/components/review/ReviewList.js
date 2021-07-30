import React, { useEffect, useState } from "react";
import { getBathroomById } from "../../modules/bathroomManager";
import { Link, useHistory, useParams } from "react-router-dom";
import { getReviewById } from "../../modules/reviewManager";
import Review from "./Review";

const ReviewList = () => {
  const [bathroom, setBathroom] = useState([]);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const getBathroom = (id) => {
    getBathroomById(id).then(oneBathroom => setBathroom(oneBathroom));
    setIsLoading(false);
  }

  const getReviews = (id) => {
    getReviewById(id).then(oneReview => setReviews(oneReview));
    setIsLoading(false);
  }


  useEffect(() => {
    getBathroom(id);
    getReviews(id);
  })

  return (
    <>
      <h3>Bathroom: {bathroom.placeName}</h3>
      <Link to={`/review/add/${bathroom.id}`}>Add a Review</Link>
      <h3>Reviews:</h3>
      <div className="container">
        <div className="row justify-content-center">
          {reviews.map((review) => {
            return <Review review={review} key={review.id} bathroomId={bathroom.id} />
          })}
        </div>
      </div>
      <Link to='/'>Back to Homepage</Link>
    </>
  );
};

export default ReviewList;