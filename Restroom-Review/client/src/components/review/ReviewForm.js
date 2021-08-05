import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { addReview } from '../../modules/reviewManager';

export const ReviewForm = () => {
  const emptyReview = {
    comment: '',
    rating: parseInt(0)
  };

  const [review, setReview] = useState(emptyReview);
  const history = useHistory();
  const { id } = useParams();

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const reviewCopy = { ...review };

    reviewCopy[key] = value;
    setReview(reviewCopy);
  };

  const handleGoingBack = () => {
    history.push(`/review/${id}`);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    review.bathroomId = id;

    console.log(review);

    addReview(review).then((p) => {
      // Navigate the user back to the home route
      history.push(`/review/${id}`);
    });
  };

  return (
    <Form className='reviewForm'>
      <FormGroup>
        <Label for="comment">Review:</Label>
        <Input type="text" name="comment" id="comment" placeholder="How was the bathroom?"
          value={review.comment}
          onChange={handleInputChange} />
      </FormGroup>
      <select type='radio' value={review.rating} name="rating" id="rating" onChange={handleInputChange} className='form-control'>
        <option value={0}>Select a Rating</option>
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
      <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
      <Button className="btn btn-primary" onClick={handleGoingBack}>Back</Button>
    </Form>
  );
};

export default ReviewForm;