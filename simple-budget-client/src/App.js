import React, { Component } from "react";
import Navigation from "./Navigation/Navigation";
import AddTransaction from "./AddTransaction/AddTransaction";
import SpendingTracker from "./SpendingTracker/SpendingTracker";
import BudgetContext from "./BudgetContext";
import config from "./config";

import "./App.css";
import AddCategories from "./AddCategory/AddCategories";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      transactions: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/categories`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
          // Authorization: `Bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/transactions`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
          // Authorization: `Bearer ${config.API_KEY}`
        }
      })
    ])
      .then(([categoriesRes, transactionsRes]) => {
        if (!categoriesRes.ok)
          return categoriesRes.json().then(event => Promise.reject(event));
        if (!transactionsRes.ok)
          return transactionsRes.json().then(event => Promise.reject(event));
          return Promise.all([categoriesRes.json(), transactionsRes.json()]);

      })
      .then(([categories, transactions]) => {
        this.setState({ categories, transactions });
      
      })
      .catch(error => {
        console.log(error);
      });
  }
  addTransaction = transaction => {
    this.setState({
      transactions: [...this.state.transactions, transaction]
    });
  };

  addCategory = category => {
    this.setState({
      categories: [...this.state.categories, category]
    });
  };

  render() {
    const value = {
      categories: this.state.categories,
      transactions: this.state.transactions,
      addTransaction: this.addTransaction,
      addCategory: this.addCategory,
      totalCost: this.state.transactions
        .map(transaction => transaction.amount)
        .reduce((a, b) => a + b, 0)
    };
   

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
