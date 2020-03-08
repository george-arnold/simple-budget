import React, { Component } from "react";
import Navigation from "./Navigation/Navigation";
import AddTransaction from "./AddTransaction/AddTransaction";
import SpendingTracker from "./SpendingTracker/SpendingTracker";
import BudgetContext from "./BudgetContext";

import "./App.css";
import AddCategories from "./AddCategory/AddCategories";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "Restaurants",
          id: 1
        },
        {
          name: "Monthly Bills",
          id: 2
        }
      ],
      transactions: [
        {
          id: 1,
          venue: "Safeway",
          amount: 123.22,
          comments: "Weekly grocery trip",
          categoryId: 1
        },
        {
          id: 2,
          venue: "Shell",
          amount: 33.12,
          comments: "gas",
          categoryId: 1
        },
        {
          id: 3,
          venue: "Chipotle",
          amount: 10.12,
          comments: "food",
          categoryId: 2
        }
      ]
    };
  }


  addTransaction = transaction => {
    this.setState({
      transactions: [...this.state.transactions,transaction]
    });
  };

  addCategory = category => {
    this.setState({
      categories: [...this.state.categories,category]
    });
  };

  render() {
    const value = {
      categories: this.state.categories,
      transactions: this.state.transactions,
      addTransaction: this.addTransaction,
      addCategory: this.addCategory,
      totalCost: this.state.transactions.map(transaction=>
        transaction.amount).reduce((a,b) => a + b, 0)
    };
    console.log(value);

    return (
      <BudgetContext.Provider value={value}>
        <main className="App">
          <Navigation />
          <h1>Simple Budget</h1>
          <AddTransaction />
          <AddCategories />
          <SpendingTracker />
        </main>
      </BudgetContext.Provider>
    );
  }
}

export default App;
