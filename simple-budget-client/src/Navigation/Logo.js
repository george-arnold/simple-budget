import React, { Component } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

class Logo extends Component {
  render() {
    return (
      <Link to="/" className="Logo-Link Button">
        <img
          alt="Simple Budget Logo"
          className="Logo"
          src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/money-circle-green-3-512.png"
        />
        Simple Budget
      </Link>
    );
  }
}

export default Logo;
