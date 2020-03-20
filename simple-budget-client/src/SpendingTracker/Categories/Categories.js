import React, { Component } from 'react';
import './Categories.css';
import BudgetContext from '../../BudgetContext';
import config from '../../config';
import TokenService from '../../token-service';

class Categories extends Component {
  static contextType = BudgetContext;

  //     .then(([categoriesRes, transactionsRes]) => {
  //       if (!categoriesRes.ok) return categoriesRes.json().then(event => Promise.reject(event));
  //       if (!transactionsRes.ok) return transactionsRes.json().then(event => Promise.reject(event));
  //       return Promise.all([categoriesRes.json(), transactionsRes.json()]);
  //     })
  //     .then(([categories, transactions]) => {
  //       this.setState({  categories, transactions} );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
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
        console.log('cat and tran', categories, transactions)
        categories.map(category => this.context.addCategory(category));
        transactions.map(transaction => this.context.addTransaction(transaction));
      });
  }
  render() {
    const { categories = [], transactions = [] } = this.context;
    return (
      <main className="Categories">
        {categories.map(category => (
          <ul key={category.id} className="CategoriesList">
            <li className="CategoriesListItem" key={category.id}>
              {category.name}
              <ul className="TransactionList">
                {transactions
                  .filter(
                    transaction =>
                      // eslint-disable-next-line
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li key={transaction.id}>
                      {transaction.venue} Spent: ${transaction.amount}
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
