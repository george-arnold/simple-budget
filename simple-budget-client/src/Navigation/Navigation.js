import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <nav className="Navigation">
        <button className="Button">Signup</button>
        <button className="Button">Login</button>
        <button className="Button">Logout</button>
      </nav>
    );
  }
}

export default Navigation;
