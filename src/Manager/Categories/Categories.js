import React, { Component } from "react";
import "./Categories.css";
import BudgetContext from "../../BudgetContext";
import AddCategories from "../../AddCategory/AddCategories";

class Categories extends Component {
  state = {
    displaySwitch: false
  };

  static contextType = BudgetContext;

  findTransactionInCategory (transactions, categoryid) {
    transactions.filter(transaction => transaction.categoryid === categoryid);
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      displaySwitch: !this.state.displaySwitch
    });
  };

  render() {
    const { categories = [], transactions = [] } = this.context;
    const displayControl = this.state.displaySwitch ? {} : { display: "none" };
    const transactionsInCategory = this.findTransactionInCategory(transactions,1);
    console.log(transactionsInCategory);
    return (
      <main className="Categories">
        <ul>
          {categories.map(category => (
            <li key={category.id} onClick={this.handleClick}>
              {" "}
              {category.name}
              <p style={displayControl}>List of Transactions Here</p>
              {/* {transactionsInCategory.map(transaction => (
                <li key={transaction.id}> {transaction.venue}</li>
              ))} */}
            </li>
          ))}
        </ul>
        <AddCategories />
      </main>
    );
  }
}

export default Categories;
