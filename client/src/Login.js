import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { client } from '../Client';
import Field from './FieldComponent.js';
import './FieldForm.css';

class Login extends Component {
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

  performLogin = () => {

    if (this.validatePasswordExists()) return;

    this.setState( { cancelLogin: false } );

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
    return pathname || '/carousel/admin';
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
