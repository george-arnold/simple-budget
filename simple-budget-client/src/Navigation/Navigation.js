import React, { Component } from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom'

class Navigation extends Component {
  render() {
    const { signedIn } = this.props;
    if (signedIn) {
      return (
        <nav className="Navigation">
          <Link to='/' onClick={() => this.props.onRouteChange('signout')} className="Button Logout">
            Logout
          </Link>
        </nav>
      );
    } else {
      return (
        <nav className="Navigation">
          <button onClick={() => this.props.onRouteChange('signup')} className="Button">
            Sign in
          </button>
          <button onClick={() => this.props.onRouteChange('register')} className="Button">
            Register
          </button>
        </nav>
      );
    }
  }
}

export default Navigation;
