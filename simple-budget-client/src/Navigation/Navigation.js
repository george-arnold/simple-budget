import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
  render() {
    const { signedIn } = this.props;
    if (signedIn) {
      return (
        <nav className="Navigation">
          <button onClick={() => this.props.onRouteChange('signout')} className="Button">
            Logout
          </button>
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
