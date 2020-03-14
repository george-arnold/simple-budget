import React, { Component } from "react";
import "./Categories.css";
import BudgetContext from "../../BudgetContext";
import AddCategories from "../../AddCategory/AddCategories";
import DeleteCategory from "../../Delete/DeleteCategory";

class Categories extends Component {
  state = {
    categoryId: null
  };

  static contextType = BudgetContext;

  handleClick = categoryId => {
    //if categoryId is a string, make it null, if null, make a string
    if (categoryId === this.state.categoryId) {
      this.setState({
        categoryId: null
      });
    } else {
      this.setState({
        categoryId
      });
    }
  };

  render() {
    const { categories = [], transactions = [] } = this.context;
    return (
      <main className="Categories">
        {categories.map(category => (
          <ul key={category.id} className="CategoriesList">
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
                      // "eslint-disable-next-line" tells React to ignore comparison use as it is intentional
                      // eslint-disable-next-line
                      transaction.categoryId == this.state.categoryId &&
                      // eslint-disable-next-line
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li key={transaction.id}>{transaction.venue}</li>
                  ))}
              </ul>
            </li>
            <DeleteCategory id={category.id}/>
          </ul>
        ))}
      </main>
    );
  }
}

export default Categories;
