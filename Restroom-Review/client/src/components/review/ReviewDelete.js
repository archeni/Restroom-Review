import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteReview, getReviewById } from "../../modules/reviewManager";
import { Button } from 'reactstrap';
import './Review.css';

export const ReviewDelete = () => {
  const [singleReview, setReview] = useState([]);
  const { id, bathroomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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
  }, []);

  return (
    <div className='reviewDelete'>
      <h3>{singleReview.comment}</h3>
      <Button
        type="button" disabled={isLoading}
        onClick={DeleteSingleReview}
        className="btn btn-primary"
      >Delete Review</Button>
      <Link to={`/review/${bathroomId}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default ReviewDelete;