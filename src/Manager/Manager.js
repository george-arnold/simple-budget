import React, { Component } from "react";
import Categories from "./Categories/Categories";

import "./Manager.css";

class Manager extends Component {
  render() {
    return (
      <main className="Manager">
        <h2> Budget Manager</h2>
        <p>
          This is where you manage your budget. Add budget categories, then, you
          can add and edit transactions.
        </p>
        <Categories />
      </main>
    );
  }
}

export default Manager;
