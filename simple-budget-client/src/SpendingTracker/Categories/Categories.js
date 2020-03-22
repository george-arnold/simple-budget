import React, { Component } from 'react';
import './Categories.css';
import BudgetContext from '../../BudgetContext';
import config from '../../config';
import TokenService from '../../token-service';

class Categories extends Component {
  static contextType = BudgetContext;

  componentDidMount() {
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
        console.log('cat and tran', categories, transactions);
      });
  }
  render() {
    const { categories = [], transactions = [] } = this.context;

    console.log('after addition', categories);
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
                      <p>
                        {transaction.venue}: ${transaction.amount}
                      </p>
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
