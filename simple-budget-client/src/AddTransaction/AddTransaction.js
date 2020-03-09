import React, { Component } from 'react';
import './AddTransaction.css';
import BudgetContext from '../BudgetContext';
import config from '../config';

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
    const transaction = {
      venue: this.state.venue,
      amount: this.state.amount,
      comments: this.state.comments,
      categoryId: this.state.categoryId
    };
    fetch(`${config.API_ENDPOINT}/transactions}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
    },
      body: JSON.stringify(transaction)
    })
    .then(res => {
      if (!res.ok) return res.json().then(event => Promise.reject(event));

      return res.json();
    })
    // this.context.addTransaction(transaction);
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
      <main className="AddTransaction">
        <h2>Transaction Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.categoryId} onChange={this.handleCategoryChange}>
            <option>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {' '}
                {category.name}
              </option>
            ))}
          </select>
          <div className="TransactionFormSection">
            <label htmlFor="venue">Where did you spend?</label>
            <input maxLength="50" id="venue" type="text" name="venue" onChange={this.handleVenueChange}></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor="amount">How much did you spend?</label>
            <input id="amount" type="number" name="amount" onChange={this.handleAmountChange}></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor="comments">Additional Comments</label>
            <textarea id="comments" name="comments" onChange={this.handleCommentChange}></textarea>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;