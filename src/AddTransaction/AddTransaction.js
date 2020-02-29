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
        categoryId: ""
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const transaction = {
      venue: this.state.venue,
      amount: this.state.amount,
      comments: this.state.comments,
      categoryId: this.state.categoryId
    };
    this.context.addTransaction(transaction);
  };

  handleVenueChange =event=> {
    this.setState({
      venue: event.target.value
    })
  }
  handleAmountChange =event=> {
    this.setState({
      amount: Number(event.target.value)
    })
  }
  handleCommentChange =event=> {
    this.setState({
      comments: event.target.value
    })
  }
  handleCategoryChange =event=> {
    this.setState({
      categoryId: Number(event.target.value)
    })
  }

  render() {
    const { categories } = this.context;
    return (
      <main className="AddTransaction">
        <h2>Transaction Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <select value = {this.state.categoryId} onChange= {this.handleCategoryChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id} >
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
            <textarea id="comments" name="comments" onChange={this.handleCommentChange}></textarea>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
