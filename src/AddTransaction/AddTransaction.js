import React, { Component } from "react";
import "./AddTransaction.css";

class AddTransaction extends Component {
  render() {
    return (
      <main className="AddTransaction">
        <form>
          <select>
            <option>Categories</option>
          </select>
          <input></input>
        </form>
      </main>
    );
  }
}

export default AddTransaction;
