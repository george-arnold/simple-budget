import React, { Component } from "react";
import "./DeleteButton.css";

class DeleteButton extends Component {
//this.props.id === id of category that you want to delete
  render() {
    return (
      <button onClick={console.log('clicked')}>Delete</button>
    );
  }
}

export default DeleteButton;
