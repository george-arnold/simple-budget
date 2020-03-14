import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      passsword: ''
    };
  }
  render() {
    return (
      <div className="Create-Account">
        <h1>Sign In</h1>
        <form className="Login-Forms" onSubmit={this.saveAndContinue}>
  

          <label className="Label">User Name</label>
          <input className="Sign-Up-Input" type="text" value={this.state.userName} onChange={this.handleUserName} />

          <label className="Label">Password</label>
          <input
            type="password"
            className="Sign-Up-Input"
            minCharacters="8"
            value={this.state.passsword}
            onChange={this.handlePasswordInput}
          />

          <input onClick={() => this.props.onRouteChange('home')} type="submit" value="submit"></input>
          <p className="Register" onClick={() => this.props.onRouteChange('register')}>Register</p>
        </form>
      </div>
    );
  }
}

export default Signin;
