import React from "react";

export default React.createContext({
  categories: [],
  transactions: [],
  addTransaction : () => {},
  totalCost: ''
});
