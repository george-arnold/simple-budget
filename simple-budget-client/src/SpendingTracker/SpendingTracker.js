import React, { Component } from 'react';
import './SpendingTracker.css';
import BudgetContext from '../BudgetContext';
import Categories from './Categories/Categories';

class SpendingTracker extends Component {
  static contextType = BudgetContext;
  render() {
    return (
      <main className="SpendingTracker">
        <h2>Your Spending</h2>
        <p>Total Amount Spent</p>
        <p>This is where you manage your budget. Add budget categories, then, you can add and edit transactions.</p>
        <h3>{this.context.totalCost}</h3>
        <Categories />
      </main>
    );
  }
}

export default SpendingTracker;
