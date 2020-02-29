import React, { Component } from "react";
import "./AddCategories.css";
import BudgetContext from '../BudgetContext';
import uniqid from 'uniqid';

class AddCategories extends Component {
  static contextType= BudgetContext;
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
    const category = {
      name: this.state.name,
      id: uniqid()
    };
    this.context.addCategory(category)
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
