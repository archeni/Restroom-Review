import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Bathroom = ({ bathroom, user }) => {

  const AuthDelete = () => {
    if (user === bathroom.userId) {
      return (
        <>
          <p><Link to={`/delete/${bathroom.id}`}>Delete</Link></p>
        </>
      )
    }
    else {
      return null
    }
  };

  return (
    <Card >
      <CardBody>
        <p>{bathroom.placeName}</p>
        <p>{bathroom.address}</p>
        <p>{bathroom.dateCreated}</p>
        <p><Link to={`/review/${bathroom.id}`}>Reviews</Link></p>
        <AuthDelete />
      </CardBody>
    </Card>
  );
};

export default Bathroom;