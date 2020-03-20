import React, { Component } from 'react';
import './Signin.css';
import config from '../config';
import TokenService from '../token-service';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    val => val.length > 0 && (valid = false)
  );
  return valid;
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  }

  handleEmail = event => {
    let message = ' ';
    if (!validEmailRegex.test(event.target.value)) {
      message = 'Email is not valid';
    }
    this.setState({
      email: event.target.value,
      errors: { email: message }
    });
    console.log('email', this.state);
  };

  handlePassword = event => {
    let passwordError = '';
    if (event.target.value < 8) {
      passwordError = 'password must be at least 8 characters';
    }
    console.log('password', event.target.value.length);
    this.setState({
      password: event.target.value,
      errors: { password: passwordError }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!validateForm(this.state.errors)) {
      console.log('invalid Form');
    } else {
      const { email, password } = this.state;
      TokenService.saveAuthToken(TokenService.makeBasicAuthToken(email, password));
      const signIn = {
        email: email,
        password: password
      };
      fetch(`${config.API_ENDPOINT}/signin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(signIn)
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.onRouteChange('home');
          }
        });
    }
  };

  render() {
    const { errors } = this.state;
    const { onRouteChange } = this.props;
    return (
      <div className="Create-Account">
        <h1>Sign In</h1>
        <p>If Sign in doesn't work, Register an Account to Sign in</p>
        <form className="Login-Forms">
          <label className="Label">email</label>
          <input
            className="Sign-Up-Input"
            type="email"
            name="email-address"
            id="email-address"
            value={this.state.email}
            onChange={this.handleEmail}
          />
          {/* {errors.email.length > 0 && <span className="error">{errors.email}</span>} */}

          <label className="Label">Password</label>
          <input type="password" className="Sign-Up-Input" value={this.state.password} onChange={this.handlePassword} />
          {/* {errors.password.length > 0 && <span className="error">{errors.password}</span>} */}

          <input onClick={this.handleSubmit} type="submit" value="submit"></input>

          <p className="Register" onClick={() => onRouteChange('register')}>
            Register
          </p>
        </form>
        <section>
          <h2>Landing Page</h2>

          <ul>
            <li>Step 1, set your categories</li>
            <li>Step 2, add transations</li>
            <li>Step 3, see your budget break down in the Spending Tracker!</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Signin;
