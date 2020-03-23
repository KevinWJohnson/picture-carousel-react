import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './AuthService';

const Auth = new AuthService();
console.log("PrivateRoute - Auth.loggedIn(): " + Auth.loggedIn());


const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => (
  <Route {...rest} 
    render={(props) => (
      Auth.loggedIn() ? (
        Render ? (
            Render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }} />
      )
    )}
  />
);

export default PrivateRoute;