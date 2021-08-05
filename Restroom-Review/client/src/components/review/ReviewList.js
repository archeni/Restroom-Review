import React, { useEffect, useState } from "react";
import { getBathroomById } from "../../modules/bathroomManager";
import { useHistory, useParams } from "react-router-dom";
import { getReviewByBathroomId } from "../../modules/reviewManager";
import { Button } from 'reactstrap';
import Review from "./Review";
import { getUserProfileId } from "../../modules/userProfileManager";
import './Review.css';

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
    console.log(currentUser);
  }

  const handleDeleteBathroom = () => {
    history.push(`/delete/${bathroom.id}`);
  }

  const handleHomePage = () => {
    history.push('/');
  }

  const handleAddReview = () => {
    history.push(`/review/add/${bathroom.id}`);
  }

  const AuthBathroomDelete = () => {
    if (currentUser === bathroom.userId) {
      return (
        <>
          <Button className="btn btn-primary" onClick={handleDeleteBathroom}>Delete Bathroom</Button>
        </>
      )
    }
    else {
      return null
    }
  };

  const BackToHomepage = () => {
    return (
      <>
        <Button className="btn btn-primary" onClick={handleHomePage}>Back To Homepage</Button>
      </>
    );
  };

  useEffect(() => {
    getBathroom(id);
    getReviews(id);
    getUser();
    console.log(bathroom);
  }, []);

  return (
    <div className='reviewHome'>
      <section className='reviewHeader'>
        <h3>Bathroom: {bathroom.placeName}</h3>
        <section className='reviewButtons'>
          <AuthBathroomDelete />
          <Button className="btn btn-primary" onClick={handleAddReview}>Add a Review</Button>
          <BackToHomepage />
        </section>
      </section>
      <h3>Reviews:</h3>
      <div className="container">
        <div className="row justify-content-center">
          {reviews.map((review) => {
            return <Review review={review} key={review.id} bathroomId={id} user={currentUser} />
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;