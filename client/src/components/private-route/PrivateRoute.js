import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthObject from "../AuthObject/AuthObject";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthObject.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )

  export default PrivateRoute;

