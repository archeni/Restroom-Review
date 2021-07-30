import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import BathroomDelete from './bathroom/BathroomDelete';
import BathroomForm from './bathroom/BathroomForm';
import BathroomList from './bathroom/BathroomList';
import Login from "./Login";
import Register from "./Register";
import ReviewDelete from './review/ReviewDelete';
import ReviewForm from './review/ReviewForm';
import ReviewList from './review/ReviewList';

export default function ApplicationViews({ isLoggedIn }) {
  useEffect(() => {
  }, []);

  return (

    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <BathroomList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/add" exact>
          {isLoggedIn ? <BathroomForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/delete/:id" exact>
          {isLoggedIn ? <BathroomDelete /> : <Redirect to="/login" />}
        </Route>

        <Route path="/review/:id" exact>
          {isLoggedIn ? <ReviewList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/review/add/:id" exact>
          {isLoggedIn ? <ReviewForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/review/delete/:id/:bathroomId" exact>
          {isLoggedIn ? <ReviewDelete /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

      </Switch>
    </main >

  );
};
