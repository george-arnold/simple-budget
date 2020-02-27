import React, { Component } from "react";
import "./AddTransaction.css";

class AddTransaction extends Component {
  render() {
    return (
      <main className="AddTransaction">
        <h2>Transaction Entry</h2>
        <form>
          <select>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
          <label>How much did you spend?</label>
          <input type="number"></input>
          <label>Where did you spend it?</label>
          <input></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
