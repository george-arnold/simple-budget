import React, { Component } from 'react';
import './AddCategories.css';
import BudgetContext from '../BudgetContext';
import config from '../config';
import TokenService from '../token-service';

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
      console.log(TokenService.getAuthToken());
      fetch(`${config.API_ENDPOINT}/categories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `basic ${TokenService.getAuthToken()}`
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
      <main className="FormContainer">
        <h2 className="FormTitle">New Categories</h2>
        <form className="Form" onSubmit={this.handleSubmit}>
          <label>Category Name</label>
          <input
            className="Form-Input"
            maxLength="50"
            type="text"
            name="Category-Input"
            id="Category-Input"
            placeholder="Bills, Groceries, etc..."
            value={this.state.name}
            onChange={this.handleNameChange}
          ></input>
          <input className="Submit" type="submit" value="Add Category"></input>
        </form>
      </main>
    );
  }
}

export default AddCategories;
