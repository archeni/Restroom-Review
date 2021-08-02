import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/userProfile';

export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getUserProfileId = () => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/currentUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
};

