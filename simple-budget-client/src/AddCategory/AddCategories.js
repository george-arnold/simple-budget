import React, { Component } from 'react';
import './AddCategories.css';
import BudgetContext from '../BudgetContext';
import config from '../config';

class AddCategories extends Component {
  static contextType = BudgetContext;

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const category = {
      name: this.state.name
    };
    if (category.name.length > 0) {
      // post category to api
      fetch(`${config.API_ENDPOINT}/categories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
          // authorization will be added in a later release
          // Authorization: `Bearer ${config.API_KEY}`
        },
        body: JSON.stringify(category)
      })
        .then(res => {
          if (!res.ok) return res.json().then(event => Promise.reject(event));
          return res.json();
        })
        .then(json => {
          this.context.addCategory(json);
          //clear the form
          this.setState({
            name: ''
          });
        })
        .catch(error => {
          console.error({ error });
        });
    } else {
      alert('Please enter a name for the category');
    }
  };

  render() {
    return (
      <form className="Form"onSubmit={this.handleSubmit}>
        <h2>New Categories</h2>
        <label>Category Name</label>
        <input maxLength="50" type="text" value={this.state.name} onChange={this.handleNameChange}></input>
        <input type="submit" value="submit"></input>
      </form>
    );
  }
}

export default AddCategories;
