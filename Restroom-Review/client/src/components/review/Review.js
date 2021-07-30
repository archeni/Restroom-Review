import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Review = ({ review }) => {
  return (
    <Card >
      <CardBody>
        <p>{review.rating}/10</p>
        <p>{review.comment}</p>
        <p>{review.dateCreated}</p>
        <p><Link to={`/review/edit/${review.id}`}>Edit</Link></p>
        <p><Link to={`/review/delete/${review.id}`}>Delete</Link></p>
      </CardBody>
    </Card>
  );
};

export default Review;