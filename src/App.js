import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Manager />
        <SpendingTracker />
      </main>
    );
  }
}

export default App;
