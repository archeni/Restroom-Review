import { React, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { getUserProfileId } from "../../modules/userProfileManager";

export const Review = ({ review, bathroomId }) => {
  const [User, setUser] = useState([]);
  const UserId = () => {
    setUser(getUserProfileId());
  }

  useEffect(() => {
    UserId();
  }, []);

  console.log(User);

  const AuthEdit = () => {
    if (User === review.userId) {
      return (
        <>
          <p><Link to={`/review/edit/${review.id}/${bathroomId}`}>Edit</Link></p>
        </>
      )
    }
    else {
      return null
    }
  };

  const AuthDelete = () => {
    if (User === review.userId) {
      return (
        <>
          <p><Link to={`/review/delete/${review.id}/${bathroomId}`}>Delete</Link></p>
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
        <p>{review.rating}/10</p>
        <p>{review.comment}</p>
        {/* <p>{review.dateCreated}</p> */}
        <AuthEdit />
        <AuthDelete />
      </CardBody>
    </Card>
  );
};

export default Review;