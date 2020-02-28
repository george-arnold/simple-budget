import React, { Component } from "react";
import "./AddTransaction.css";
import BudgetContext from "../BudgetContext";

class AddTransaction extends Component {
  static contextType = BudgetContext;

  constructor(props){
    super(props);
    this.state ={ 
        venue: "",
        amount: "",
        comments: "",
        categoryid: 1
    }

    this.handleVenueChange = this.handleVenueChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);

  }

  handleSubmit = event => {
    event.preventDefault();
    const transaction = {
      venue: this.state.venue,
    };

    // this.context.addTransaction(transaction);
    // do-later POST new Transaction
  };

  handleVenueChange (event) {
    this.setState({
      venue: event.target.value
    })
  }
  handleAmountChange (event) {
    this.setState({
      venue: event.target.value
    })
  }

  render() {
    const { categories } = this.context;
    return (
      <main className="AddTransaction">
        <h2>Transaction Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <select>
            {categories.map(category => (
              <option key={category.id} name={category.id} value={category.id}>
                {" "}
                {category.name}
              </option>
            ))}
          </select>
          <div className="TransactionFormSection">
            <label htmlFor="venue">Where did you spend?</label>
            <input id="venue" type="text" name="venue" onChange={this.handleVenueChange}></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor="amount">How much did you spend?</label>
            <input id="amount" type="number" name="amount" onChange={this.handleAmountChange}></input>
          </div>
          <div className="TransactionFormSection">
            <label htmlFor="comments">Additional Comments</label>
            <textarea id="comments" name="comments"></textarea>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
