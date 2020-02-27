import React, { Component } from "react";
import Categories from "./Categories/Categories";

import "./Manager.css";

class Manager extends Component {
  render() {
    return (
      <main className="Manager">
        <p>
          This is where you manage your budget. Create a folder, add budget
          categories, then, you can edit transactions.
        </p>
        <Categories />
      </main>
    );
  }
}

export default Manager;
