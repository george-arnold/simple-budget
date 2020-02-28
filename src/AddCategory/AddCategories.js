import React, { Component } from "react";
import "./AddCategories.css";

class AddCategories extends Component {
 

  render() {
    return (
      <form>
        <h2>New Categories</h2>
        <label>Category Name</label>
        <input type="text"></input>
        <button>Add Category</button>
      </form>
    );
  }
}

export default AddCategories;
