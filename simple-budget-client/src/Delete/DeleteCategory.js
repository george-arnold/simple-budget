import React, { Component } from "react";
import "./DeleteCategory.css";

class DeleteCategory extends Component {

  handleDeleteCategory = event=> {
    event.preventDefault();
    const categoryId = this.props.id;
    fetch (`${config.API}`)
  }
//this.props.id === id of category that you want to delete
  render() {
    return (
      <button onClick={handleDeleteCategory}>Delete</button>
    );
  }
}

export default DeleteCategory;
