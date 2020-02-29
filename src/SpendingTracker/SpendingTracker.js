import React, { Component } from "react";
import "./SpendingTracker.css";
import BudgetContext from "../BudgetContext";

class SpendingTracker extends Component {
  static contextType = BudgetContext;
  render() {
    return (
      <main className="SpendingTracker">
        <h2>Your Spending</h2>
        <p>Total Amount Spent</p>
        <h3>{this.context.totalCost}</h3>
      </main>
    );
  }
}

export default SpendingTracker;
