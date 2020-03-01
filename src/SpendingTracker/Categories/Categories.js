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
    console.log(categoryId);
    //if categoryId is a string, make it null, if null, make a string
    if ((categoryId === this.state.categoryId)) {
      this.setState({
        categoryId: null,
      });
    } else {
      this.setState({
        categoryId
      });
    }
  };

  render() {
    const { categories = [], transactions = [] } = this.context;
    console.log(transactions, "in categories");
    return (
      <main className="Categories">
        <ul className="CategoriesList">
          {categories.map(category => (
            <li
              className="CategoriesListItem"
              key={category.id}
              onClick={() => this.handleClick(category.id)}
            >
              + {category.name}
              <ul className="TransactionList">
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
