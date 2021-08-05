import React from "react";
import { CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import './Review.css';

export const Review = ({ review, bathroomId, user }) => {
  const history = useHistory();
  const reviewDate = new Date(review.dateCreated).toDateString()

  const handleEditReview = () => {
    history.push(`/review/edit/${review.id}/${bathroomId}`);
  }

  const handleDeleteReview = () => {
    history.push(`/review/delete/${review.id}/${bathroomId}`);
  }

  const AuthEdit = () => {
    if (user === review.userId) {
      return (
        <>
          <Button className="btn btn-primary" onClick={handleEditReview}>Edit</Button>
        </>
      )
    }
    else {
      return null
    }
  };

  const AuthDelete = () => {
    if (user === review.userId) {
      return (
        <>
          <Button className="btn btn-primary" onClick={handleDeleteReview}>Delete</Button>
        </>
      )
    }
    else {
      return null
    }
  };

  return (
    <div>
      <CardBody>
        <p>{review.rating}/10</p>
        <p>{review.comment}</p>
        <p>{reviewDate}</p>
        {/* <p>{review.dateCreated}</p> */}
        <AuthEdit />
        <AuthDelete />
      </CardBody>
    </div>
  );
};

export default Review;