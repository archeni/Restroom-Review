import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/review';

export const getAllReviews = () => {
  return getToken().then((token) =>
    fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};

export const addReview = (review) => {
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })).then(resp => resp.json())
};

export const deleteReview = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
};

export const editReview = (review) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/edit/${review.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }))
};

export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getReviewById = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
};

export const getReviewByBathroomId = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/bathroom/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
};
