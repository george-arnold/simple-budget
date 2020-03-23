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
    let message = '';
    const { value } = event.target;
    if (!validEmailRegex.test(value)) {
      message = '--Email is not valid';
    }
    this.setState(prevState => {
      return {
        email: value,
        errors: {
          email: message,
          password: prevState.errors.password
        }
      };
    });
  };

  handlePassword = event => {
    let passwordError = '';
    const { value } = event.target;
    if (value.length < 8) {
      passwordError = '--Password must be at least 8 characters';
    }
    this.setState(prevState => {
      return {
        loginError: '',
        password: value,
        errors: {
          email: prevState.errors.email,
          password: passwordError
        }
      };
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!validateForm(this.state.errors) || !(this.state.email && this.state.password)) {
      alert('Error: please complete the form' + this.state.errors.email + ' ' + this.state.errors.password);
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
        .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
        .then(user => {
          console.log(user);
          if (user.id) {
            this.props.onRouteChange('home');
          }
        })
        .catch(res => {
          this.setState(prevState => {
            if (res.email) {
              return {
                errors: {
                  email: res.email,
                  password: prevState.errors.password
                }
              };
            } else {
              return {
                errors: {
                  email: prevState.errors.email,
                  password: res.password
                }
              };
            }
          });
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
          {errors.email.length > 0 && <span className="error">{errors.email}</span>}

          <label className="Label">Password</label>
          <input type="password" className="Sign-Up-Input" value={this.state.password} onChange={this.handlePassword} />
          {errors.password.length > 0 && <span className="error">{errors.password}</span>}

          <input onClick={this.handleSubmit} type="submit" value="submit"></input>

          <p className="Register" onClick={() => onRouteChange('register')}>
            Register
          </p>
        </form>
        <section>
          <p>This is where you manage your budget. Add budget categories, then, you can add and edit transactions.</p>

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
