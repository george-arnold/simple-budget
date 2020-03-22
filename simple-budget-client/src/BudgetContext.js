import React from 'react';

export default React.createContext({
  categories: [],
  transactions: [],
  addTransaction: () => {},
  addCategory: () => {},
  deleteTransaction: () => {},
  addToTotal: () => {},
  // loadUser: () => {},
  totalCost: ''
});
