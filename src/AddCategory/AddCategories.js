import React, { Component } from "react";
import "./AddCategories.css";

class AddCategories extends Component {
  constructor(props){
    super(props);
    this.state ={ 
        name: ""
    }
  }
  render() {
    return (
      <form>
        <h2>New Categories</h2>
        <label>Category Name</label>
        <input type="text"></input>

        <input type = "submit" value= "submit" ></input>
      </form>
    );
  }
}

export default AddCategories;
