import React, { Component } from 'react';
import './Signin.css';

class Register extends Component {
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
        <h1>Create account</h1>
        <form className="Login-Forms" onSubmit={this.saveAndContinue}>
          <label className="Label">Email Address</label>
          <input
            text="Email Address"
            className="Sign-Up-Input"
            ref="email"
            type="text"
            defaultValue={this.state.email}
            value={this.state.email}
            onChange={this.handleEmailInput}
          />

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
          <label className="Label">Confirm Password</label>
          <input
            type="password"
            className="Sign-Up-Input"
            minCharacters="8"
            value={this.state.passsword}
            onChange={this.handlePasswordInput}
          />

          <input onClick={() => this.props.onRouteChange('home')} type="submit" value="submit"></input> 
        </form>
      </div>
    );
  }
}

export default Register;
