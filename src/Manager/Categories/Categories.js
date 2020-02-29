import React, { Component } from "react";
import "./Categories.css";
import BudgetContext from "../../BudgetContext";
import AddCategories from "../../AddCategory/AddCategories";

class Categories extends Component {
  state = {
    categoryId: null
  };

  static contextType = BudgetContext;

  handleClick = categoryId => {
    this.setState({
      categoryId
    });
  };

  render() {
    const { categories = [], transactions = [] } = this.context;
    console.log(transactions, "in categories");
    return (
      <main className="Categories">
        <ul>
          {categories.map(category => (
            <li key={category.id} onClick={() => this.handleClick(category.id)}>
              {category.name}
              <ul>
                {transactions
                  .filter(
                    transaction =>
                      transaction.categoryId == this.state.categoryId &&
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li key={transaction.id}>{transaction.venue}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
        <AddCategories />
      </main>
    );
  }
}

export default Categories;
