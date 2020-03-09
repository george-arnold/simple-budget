import React, { Component } from "react";
import "./DeleteButton.css";

class DeleteButton extends Component {

  render() {
    return (
      <button onClick={console.log('clicked')}>Delete</button>
    );
  }
}

export default DeleteButton;
