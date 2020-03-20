import React from "react";

export default React.createContext({
  categories: [],
  transactions: [],
  addTransaction : () => {},
  addCategory : () => {},
  deleteCategory : () => {},
  // loadUser: () => {},
  totalCost: ''
});
