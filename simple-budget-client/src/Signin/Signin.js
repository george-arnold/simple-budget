import React, { Component } from 'react';

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
<div className="create_account_screen">

<div className="create_account_form">
  <h1>Create account</h1>
  <p>Example of form validation built with React.</p>
  <form onSubmit={this.saveAndContinue}>
<label>Email Address</label>
    <input 
      text="Email Address" 
      ref="email"
      type="text"
      defaultValue={this.state.email} 
      value={this.state.email}
      onChange={this.handleEmailInput} 
    />
    <label>User Name</label>
    <input 
    type= "text"
      value={this.state.userName}
      onChange={this.handleUserName} 
    /> 
<label>Password</label>
    <input 
      type="password"
      ref="password"
      minCharacters="8"
      value={this.state.passsword}
      onChange={this.handlePasswordInput} 
    /> 
    <label>Confirm Password</label>
    <input 
      type="password"
      validate={this.isConfirmedPassword}
      value={this.state.confirmPassword}
      onChange={this.handleConfirmPasswordInput} 
    /> 

    

    <button 
      type="submit" 
      className="button">
      Sign up
    </button>

  </form>
</div>

</div>
    );
  }
}

export default Signin;
