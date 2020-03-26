import React, { Component } from 'react';
import './AddTransaction.css';
import BudgetContext from '../BudgetContext';
import config from '../config';
import Categories from '../SpendingTracker/Categories/Categories';
import { Link } from 'react-router-dom';
import TokenService from '../token-service';
class AddTransaction extends Component {
  static contextType = BudgetContext;

  constructor(props) {
    super(props);
    this.state = {
      venue: '',
      amount: '',
      categoryId: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { venue, amount, categoryId } = this.state;
    const transaction = {
      venue: venue,
      amount: amount,
      category_id: categoryId
    };
    console.log('transaction put into Post', transaction);
    fetch(`${config.API_ENDPOINT}/transactions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `basic ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(transaction)
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(json => {
        this.context.addTransaction(json);
        this.setState({
          venue: '',
          amount: '',
          categoryId: ''
        });
      });
  };

  handleVenueChange = event => {
    this.setState({
      venue: event.target.value
    });
  };
  handleAmountChange = event => {
    this.setState({
      amount: Number(event.target.value)
    });
  };
  handleCategoryChange = event => {
    this.setState({
      categoryId: event.target.value
    });
  };

  render() {
    const { categories } = this.context;
    return (
      <main className="FormContainer Transaction-Container">
        <h2 className="FormTitle">Transaction Entry</h2>
        <img
          className="Landing-Page-Icon App-Icon Transaction-Icon"
          alt="money"
          src="https://cdn0.iconfinder.com/data/icons/business-management-line-2/24/cash-512.png"
        />

        <form className="Form" onSubmit={this.handleSubmit}>
          <label htmlFor="category-selector" className="Category-Select-Label">
            Click below to select a category:
          </label>
          <select
            id="category-selector"
            name="category-selector"
            className="CategorySelector"
            value={this.state.categoryId}
            onChange={this.handleCategoryChange}
          >
            <option>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {' '}
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="venue">Where did you spend?</label>
          <input
            maxLength="50"
            className="Form-Input"
            id="venue"
            type="text"
            name="venue"
            value={this.state.venue}
            onChange={this.handleVenueChange}
          ></input>

          <label htmlFor="amount">How much did you spend?</label>
          <input
            id="amount"
            className="Form-Input"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          ></input>

          <input className="Submit Submit-Category" type="submit" value="Add Transaction"></input>
        </form>
        <Categories />
        <h4>Click here to see your total spending</h4>
        <Link className="Link" to="/track">
          SpendingTracker
        </Link>
      </main>
    );
  }
}

export default AddTransaction;
