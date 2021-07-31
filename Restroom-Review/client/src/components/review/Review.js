import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Review = ({ review, bathroomId }) => {
  return (
    <Card >
      <CardBody>
        <p>{review.rating}/10</p>
        <p>{review.comment}</p>
        <p>{review.dateCreated}</p>
        <p><Link to={`/review/edit/${review.id}/${bathroomId}`}>Edit</Link></p>
        <p><Link to={`/review/delete/${review.id}/${bathroomId}`}>Delete</Link></p>
      </CardBody>
    </Card>
  );
};

export default Review;