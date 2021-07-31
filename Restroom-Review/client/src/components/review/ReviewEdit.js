import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { editReview, getReviewById } from "../../modules/reviewManager";
import './Review.css';

export const ReviewEdit = () => {
  const [singleReview, setReview] = useState([]);
  const { id, bathroomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getReview = (id) => {
    getReviewById(id).then(review => setReview(review));
    setIsLoading(false);
  };

  const handleCommentInputChange = (evt) => {
    const newReviewComment = { ...singleReview }
    let selectedVal = evt.target.value
    newReviewComment.comment = selectedVal
    setReview(newReviewComment)
  };

  const handleRatingInputChange = (evt) => {
    const newReviewRating = { ...singleReview }
    let selectedVal = evt.target.value
    newReviewRating.rating = parseInt(selectedVal)
    setReview(newReviewRating)
  };

  const EditSingleReview = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editReview(singleReview)
      .then(() => history.push(`/review/${bathroomId}`))
  }

  useEffect(() => {
    getReview(id);
  }, []);

  return (
    <>
      <h3>Please change the Review</h3>
      <form>
        <input type="text"
          id="commentEdit"
          name="commentEdit"
          onChange={handleCommentInputChange}
          defaultValue={singleReview.comment}
        ></input>
        <select type='radio' value={singleReview.rating} name="ratingEdit" id="ratingEdit" onChange={handleRatingInputChange} className='form-control'>
          <option value={0}>Select a Rating</option>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </form>
      <button
        type="button" disabled={isLoading}
        onClick={EditSingleReview}
        className="btn btn-primary"
      >Edit Review</button>
      <Link to={`/review/${bathroomId}`}>
        <button>Back</button>
      </Link>
    </>
  );
}

export default ReviewEdit;