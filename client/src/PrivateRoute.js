import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './AuthService';

const Auth = new AuthService();

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.loggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />
    )
  )} />
);

export default PrivateRoute;