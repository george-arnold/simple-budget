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
      comments: '',
      categoryId: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { venue, amount, comments, categoryId } = this.state;
    const transaction = {
      venue: venue,
      amount: amount,
      comments: comments,
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
          comments: '',
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
  handleCommentChange = event => {
    this.setState({
      comments: event.target.value
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
      <main className="FormContainer">
        <h2 className="FormTitle">Transaction Entry</h2>
        <form className="Form" onSubmit={this.handleSubmit}>
          <select className="CategorySelector" value={this.state.categoryId} onChange={this.handleCategoryChange}>
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
            id="venue"
            type="text"
            name="venue"
            value={this.state.venue}
            onChange={this.handleVenueChange}
          ></input>

          <label htmlFor="amount">How much did you spend?</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          ></input>

          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={this.state.comments}
            onChange={this.handleCommentChange}
          ></textarea>

          <input type="submit" value="Submit"></input>
          <Categories />
          <h4>Click here to see your total spending</h4>
          <Link className="Link" to="/track">
            SpendingTracker
          </Link>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
