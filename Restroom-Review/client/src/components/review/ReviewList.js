import React, { useEffect, useState } from "react";
import { getBathroomById } from "../../modules/bathroomManager";
import { Link, useHistory, useParams } from "react-router-dom";
import { getReviewByBathroomId } from "../../modules/reviewManager";
import Review from "./Review";
import { getUserProfileId } from "../../modules/userProfileManager";

const ReviewList = () => {
  const [bathroom, setBathroom] = useState([]);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setUser] = useState([]);

  const getBathroom = (id) => {
    getBathroomById(id).then(oneBathroom => setBathroom(oneBathroom));
    // setIsLoading(false);
  }

  const getReviews = (id) => {
    getReviewByBathroomId(id).then(oneReview => setReviews(oneReview));
    // setIsLoading(false);
  }

  const getUser = () => {
    getUserProfileId().then(oneUser => setUser(oneUser.id));
  }

  useEffect(() => {
    getBathroom(id);
    getReviews(id);
    getUser();
  }, []);

  return (
    <>
      <h3>Bathroom: {bathroom.placeName}</h3>
      <Link to={`/delete/${bathroom.id}`}>Delete Bathroom</Link>
      <hr></hr>
      <Link to={`/review/add/${bathroom.id}`}>Add a Review</Link>
      <hr></hr>
      <Link to='/'>Back to Homepage</Link>
      <h3>Reviews:</h3>
      <div className="container">
        <div className="row justify-content-center">
          {reviews.map((review) => {
            return <Review review={review} key={review.id} bathroomId={id} user={currentUser} />
          })}
        </div>
      </div>
    </>
  );
};

export default ReviewList;