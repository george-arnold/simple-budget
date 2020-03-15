import React, { Component } from 'react';
import './Signin.css';
import config from '../config';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: ''
    };
  }

  handleEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleUserName = event => {
    this.setState({
      userName: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, userName } = this.state;
    const register = {
      email: email,
      password: password,
      userName: userName
    };
    console.log(register);
    fetch(`${config.API_ENDPOINT}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(register)
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };
  render() {
    return (
      <div className="Create-Account">
        <h1>Create account</h1>
        <form className="Login-Forms">
          <label className="Label">Name</label>
          <input className="Sign-Up-Input" type="text" value={this.state.userName} onChange={this.handleUserName} />
          <label className="Label">Email Address</label>
          <input
            text="Email Address"
            className="Sign-Up-Input"
            type="email"
            id="register-email"
            name="register-email"
            value={this.state.email}
            onChange={this.handleEmail}
          />

          <label className="Label">Password</label>
          <input
            type="password"
            id="register-password"
            name="register-password"
            className="Sign-Up-Input"
            value={this.state.password}
            onChange={this.handlePassword}
          />

          <input onClick={this.handleSubmit} type="submit" value="submit"></input>
        </form>
      </div>
    );
  }
}

export default Register;
