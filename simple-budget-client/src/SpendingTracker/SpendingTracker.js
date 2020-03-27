import React, { Component } from 'react';
import './SpendingTracker.css';
import BudgetContext from '../BudgetContext';
import { Link } from 'react-router-dom';
import SpendingGraph from './SpendingGraph';

class SpendingTracker extends Component {
  static contextType = BudgetContext;
  /* eslint-disable */
  render() {
    const { categories, transactions } = this.context;
    return (
      <main className="SpendingTracker">
        <h2>Your Spending</h2>
        <div className="Spending-Graph-Container">
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

          <SpendingGraph categories={this.context.categories} />
        </div>
        <p>Total Amount Spent</p>
        <h3>${Math.floor(this.context.totalCost * 100) / 100}</h3>
        <Link to="/"> Back to Mainpage</Link>
      </main>
    );
  }
}

export default SpendingTracker;
