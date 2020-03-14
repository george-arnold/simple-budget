import React, { Component } from 'react';
import './Signin.css'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      userName: '',
      passsword: '', 
    };
  }
  render() {
    return (

<div className="Create-Account">
  <h1>Create account</h1>
  <form className="Login-Forms" onSubmit={this.saveAndContinue}>
  <div>
  <label className= "Label">Email Address</label>
    <input 
      text="Email Address"
      className="Form-Control" 
      ref="email"
      type="text"
      defaultValue={this.state.email} 
      value={this.state.email}
      onChange={this.handleEmailInput} 
    />
    </div>
    <div>
    <label className= "Label">User Name</label>
    <input 
    type= "text"
      value={this.state.userName}
      onChange={this.handleUserName} 
    /> 
    </div>
    <div>
<label className= "Label">Password</label>
    <input 
      type="password"
      ref="password"
      minCharacters="8"
      value={this.state.passsword}
      onChange={this.handlePasswordInput} 
    /> 
    </div>

    <button 
      type="submit" 
      className="button">
      Sign up
    </button>

  </form>
</div>

    );
  }
}

export default Signin;
