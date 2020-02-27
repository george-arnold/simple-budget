import React, { Component } from "react";
import Navigation from "./Navigation/Navigation";
import Manager from "./Manager/Manager";
import AddTransaction from "./AddTransaction/AddTransaction";
import SpendingTracker from "./SpendingTracker/SpendingTracker";

import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Navigation />
        <Manager />
        <AddTransaction />
        <SpendingTracker />
      </main>
    );
  }
}

export default App;
