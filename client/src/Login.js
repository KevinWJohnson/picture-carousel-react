import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { client } from '../Client';
import Field from './FieldComponent.js';
import './FieldForm.css';
import AuthService from './AuthService';

class Login extends Component {
  
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  state = {
    loginInProgress: false,
    shouldRedirect: false,
    cancelLogin: false,
    passwordName: '',
    passwordInputted: '',
    passwordError: ''
  };


handleCancelLogin = () => {
  this.setState( { cancelLogin: true } );

  this.setState({passwordName: '',
                passwordInputted: '', 
                passwordError: ''});
};


onInputChange = ({name, value, error}) => {
  this.setState({passwordName: name,
                passwordInputted: value, 
                passwordError: error});
};

// Form level validation
validatePasswordExists = () => {
  if (this.state.passwordInputted.length === 0) return true;
  if (this.state.passwordInputted.length === 0) return true;
  return false;
};


performLogin = (event) => {
  event.preventDefault();
  if (this.validatePasswordExists()) return;

  this.setState( { cancelLogin: false } );

  this.Auth.login(this.state.passwordInputted)
  .then(res => {
    this.setState({ shouldRedirect: true });
    
    // once user is logged in
    // take them to the admin route
    
    //this.props.history.push('/carousel/admin');
  })
  .catch(err => {
    console.log(err.response);
    alert(err.response.data.message)
  });

  // this.setState({ loginInProgress: true });
  // client.login().then(() => (
  //   this.setState({ shouldRedirect: true })
  // ));
};

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    // This needs to go to /carousel/admin instead of the last location before
    // the login page because you do not what to go back to the /carousel page
    // without the admin buttons of create, edit, and delete.
    return '/carousel/admin';
    //return pathname || '/carousel/admin';
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <div className="container">
          <h1>Login</h1>

          <form onSubmit={this.performLogin}>

            <Field
              placeholder="Password goes here..."
              name="password"
              value={this.props.passwordInputted}
              onChange={this.onInputChange}
              validate={val => (val ? false : 'Password Required')}
            />

            <br />
            <input type="submit" id="buttonSubmit" value="Submit" disabled={this.validatePasswordExists()} />
            <input type="button" id="buttonCancel" name="cancelForm" value="Cancel" onClick={this.handleCancelLogin}></input>

          </form>
        </div>
       );
    }
  }
}

export default Login;
