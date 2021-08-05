import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import './Bathroom.css';


export const Bathroom = ({ bathroom, user }) => {
  const history = useHistory()
  const bathroomDate = new Date(bathroom.dateCreated).toDateString()

  const handleGoToReviews = () => {
    history.push(`/review/${bathroom.id}`);
  }

  const handleDeleteBathroom = () => {
    history.push(`/delete/${bathroom.id}`);
  }

  const AuthDelete = () => {
    if (user === bathroom.userId) {
      return (
        <>
          <Button className="btn btn-primary" onClick={handleDeleteBathroom}>Delete</Button>
        </>
      )
    }
    else {
      return null
    }
  };

  return (
    <div className='bathrooms'>
      <div>
        <p>{bathroom.placeName}</p>
        <p>{bathroom.address}</p>
        <p>{bathroomDate}</p>
        <Button className="btn btn-primary" onClick={handleGoToReviews}>Reviews</Button>
        <AuthDelete />
      </div>
    </div>
  );
};

export default Bathroom;