import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './AuthService';

class Logout extends Component {

  constructor(props) {
    super(props);

    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

export default Logout;
