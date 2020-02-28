import React, { Component } from "react";
import "./AddCategories.css";

class AddCategories extends Component {
  constructor(props){
    super(props);
    this.state ={ 
        name: ""
    }
  }
  handleNameChange =event => {
    this.setState({
      name: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  }


  render() {
    return (
      <form onSubmit= {this.handleSubmit}>
        <h2>New Categories</h2>
        <label>Category Name</label>
        <input type="text" onChange={this.handleNameChange}></input>
        <input type = "submit" value= "submit" ></input>
      </form>
    );
  }
}

export default AddCategories;
