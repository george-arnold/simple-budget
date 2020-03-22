import React, { Component } from 'react';
import './SpendingTracker.css';
import BudgetContext from '../BudgetContext';
import { Link } from 'react-router-dom';
class SpendingTracker extends Component {
  static contextType = BudgetContext;
  render() {
    return (
      <main className="SpendingTracker FormContainer">
        <h2>Your Spending</h2>
        <p>Total Amount Spent</p>
        <p>This is where you manage your budget. Add budget categories, then, you can add and edit transactions.</p>
        <h3>{this.context.totalCost}</h3>
        {/* not in scope for this project <h3> Your Financial Plan: </h3> */}
        <Link to="/"> Back to Mainpage</Link>
      </main>
    );
  }
}

export default SpendingTracker;
