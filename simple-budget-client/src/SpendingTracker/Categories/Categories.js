import React, { Component } from "react";
import "./Categories.css";
import BudgetContext from "../../BudgetContext";

class Categories extends Component {

  static contextType = BudgetContext;

  render() {
    const { categories = [], transactions = [] } = this.context;
    console.log('transactions in Categories', transactions);
    return (
      <main className="Categories">
        {categories.map(category => (
          <ul key={category.id} className="CategoriesList">
            <li
              className="CategoriesListItem"
              key={category.id}
            >
              {category.name}
              <ul className="TransactionList">
                {transactions
                  .filter(
                    transaction =>
                      // eslint-disable-next-line
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li key={transaction.id}>{transaction.venue} Spent: ${transaction.amount}</li>
                  ))}
              </ul>
            </li>
          </ul>
        ))}
      </main>
    );
  }
}

export default Categories;
