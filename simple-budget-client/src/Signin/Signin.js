import React, { Component } from 'react';
import './Signin.css';
import config from '../config'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleSubmit = (event) => { 
    event.preventDefault();
    const {email, password} = this.state;
    const signIn = {
      email:  email,
      password: password
    }
    console.log(signIn);
    fetch(`${config.API_ENDPOINT}/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'},
      body: JSON.stringify(signIn)
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
   
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <div className="Create-Account">
        <h1>Sign In</h1>
        <form className="Login-Forms">
          <label className="Label">email</label>
          <input 
          className="Sign-Up-Input" 
          type="email"
          name="email-address"
          id="email-address" 
          value={this.state.email} 
          onChange={this.handleEmail} />

          <label className="Label">Password</label>
          <input
            type="password"
            className="Sign-Up-Input"
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <input onClick={this.handleSubmit} type="submit" value="submit"></input>
          <p className="Register" onClick={() => onRouteChange('register')}>Register</p>
        </form>
      </div>
    );
  }
}

export default Signin;
