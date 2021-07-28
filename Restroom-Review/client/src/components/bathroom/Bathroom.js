import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Bathroom = ({ bathroom }) => {
  return (
    <Card >
      <CardBody>
        <p>{bathroom.placeName}</p>
        <p>{bathroom.address}</p>
        <p><Link to={`/delete/${bathroom.id}`}>Delete</Link></p>
        <p><Link to={`/edit/${bathroom.id}`}>Edit</Link></p>
      </CardBody>
    </Card>
  );
};

export default Bathroom;