import React, { Component } from "react";
import Navigation from "./Navigation/Navigation";
import Manager from "./Manager/Manager";
import AddTransaction from "./AddTransaction/AddTransaction";
import SpendingTracker from "./SpendingTracker/SpendingTracker";
import BudgetContext from "./BudgetContext";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "Restaurants",
          categoryid: 1
        },
        {
          name: "Monthly Bills",
          categoryid: 2
        }
      ],
      transactions: [
        {
          id: 1,
          venue: "Safeway",
          amount: 123.22,
          comments: "Weekly grocery trip",
          categoryid: 1
        },
        {
          id: 2,
          venue: "Shell",
          amount: 33.12,
          comments: "Weekly grocery trip",
          categoryid: 1
        }
      ]
    };
  }
  // createTransaction = transaction => {
  //   this.setState({
  //     transactons: []
  //   });
  // };

  render() {
    const value = {
      categories: this.state.categories,
      transactions: this.state.transactions
    };
    return (
      <BudgetContext.Provider value={value}>
        <main className="App">
          <Navigation />
          <Manager />
          <AddTransaction />
          <SpendingTracker />
        </main>
      </BudgetContext.Provider>
    );
  }
}

export default App;
