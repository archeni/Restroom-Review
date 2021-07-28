import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import BathroomForm from './bathroom/BathroomForm';
import BathroomList from './bathroom/BathroomList';
import Login from "./Login";
import Register from "./Register";

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
