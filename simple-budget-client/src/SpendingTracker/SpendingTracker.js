import React, { Component } from 'react';
import './SpendingTracker.css';
import BudgetContext from '../BudgetContext';
import { Link } from 'react-router-dom';
class SpendingTracker extends Component {
  static contextType = BudgetContext;
  render() {
    return (
      <main className="SpendingTracker">
        <h2>Your Spending</h2>
        <p>Total Amount Spent</p>
        <h3>${this.context.totalCost}</h3>
        {/* not in scope for this project <h3> Your Financial Plan: </h3> */}
        <Link to="/"> Back to Mainpage</Link>
      </main>
    );
  }
}

export default SpendingTracker;
