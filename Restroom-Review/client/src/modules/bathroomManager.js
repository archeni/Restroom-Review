import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/bathroom';

export const getAllBathrooms = () => {
  debugger
  return getToken().then((token) =>
    fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};

export const addBathroom = (bathroom) => {
  debugger
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bathroom),
    })).then(resp => resp.json())
};

export const deleteBathroom = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }))
};

export const editBathroom = (bathroom) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/edit/${bathroom.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bathroom),
    }))
};

export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getBathroomById = (id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
};