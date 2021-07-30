import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteReview, getReviewById } from "../../modules/reviewManager";

export const ReviewDelete = ({ bathroomId }) => {
  const [singleReview, setReview] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [bathroom, setBathroom] = useState([]);

  const getReview = (id) => {
    getReviewById(id).then(oneReview => setReview(oneReview));
    setIsLoading(false);
  }

  const DeleteSingleReview = (e) => {
    e.preventDefault();
    setIsLoading(true);

    deleteReview(singleReview.id)
      .then(() => history.push(`/review/${bathroomId}`))
  }

  useEffect(() => {
    getReview(id);
    setBathroom(bathroom)
    console.log(bathroomId);
  }, []);

  return (
    <>
      <h3>{singleReview.comment}</h3>
      <button
        type="button" disabled={isLoading}
        onClick={DeleteSingleReview}
        className="btn btn-primary"
      >Delete Review</button>
      <Link to={`/review/${bathroomId}`}>
        <button>Back</button>
      </Link>
    </>
  );
}

export default ReviewDelete;