import React, { Component } from 'react';
import './Categories.css';
import BudgetContext from '../../BudgetContext';
import config from '../../config';
import TokenService from '../../token-service';
import DeleteTransaction from '../../Delete/DeleteTransaction';

class Categories extends Component {
  static contextType = BudgetContext;

  componentDidMount() {
    const { categories = [] } = this.context;
    categories.length === 0 &&
      Promise.all([
        fetch(`${config.API_ENDPOINT}/categories`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `basic ${TokenService.getAuthToken()}`
          }
        }),
        fetch(`${config.API_ENDPOINT}/transactions`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `basic ${TokenService.getAuthToken()}`
          }
        })
      ])
        .then(([categoriesRes, transactionsRes]) => {
          if (!categoriesRes.ok) return categoriesRes.json().then(event => Promise.reject(event));
          if (!transactionsRes.ok) return transactionsRes.json().then(event => Promise.reject(event));
          return Promise.all([categoriesRes.json(), transactionsRes.json()]);
        })
        .then(([categories, transactions]) => {
          categories.map(category => this.context.addCategory(category));
          transactions.map(transaction => this.context.addTransaction(transaction));
        });
  }
  render() {
    const { categories = [], transactions = [] } = this.context;
    return (
      <main className="Categories">
        {categories.map(category => {
          category.total = transactions
            .filter(
              transaction =>
                // eslint-disable-next-line
                transaction.categoryId == category.id
            )
            .map(transaction => Number(transaction.amount))
            .reduce((a, b) => a + b, 0);
        })}
        {categories.map(category => (
          <ul key={category.id} className="CategoriesList">
            <li className="CategoriesListItem" key={category.id}>
              {category.name}: ${category.total}
              <ul className="TransactionList">
                {transactions
                  .filter(
                    transaction =>
                      // eslint-disable-next-line
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li key={transaction.id}>
                      <div>
                        {transaction.venue}: ${transaction.amount}
                        <DeleteTransaction id={transaction.id} />
                      </div>
                    </li>
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
