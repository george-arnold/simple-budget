import React, { Component } from "react";
import "./AddTransaction.css";
import BudgetContext from "../BudgetContext";

class AddTransaction extends Component {
  handleSubmit = event => {
    event.preventDefault();
  const transaction = 
    {
      venue: event.target["transaction-venue"].value,
      amount: event.target["transaction-amount"].value,
      comments: event.target["transaction-comments"].value,
      categoryid: event.target["transaction-categoryid"].value
    }
    
    // do-later POST new Transaction
  };
  static contextType = BudgetContext;

  render() {
    const { categories } = this.context;
    return (
      <main className="AddTransaction">
        <h2>Transaction Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <select>
            {categories.map(category => (
              <option key={category.id} name = {category.id} value={category.id}>
                {" "}
                {category.name}
              </option>
            ))}
          </select>
          <div className="TransactionFormSection">
            <label htmlFor="venue">Where did you spend?</label>
            <input id="venue" type="text" name= "transaction-venue"></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor="amount">How much did you spend?</label>
            <input id="amount" type="number" name= "transaction-amount"></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor= "comments">Additional Comments</label>
            <textarea id="comments" name= "transaction-comments"></textarea>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
