import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import AddTransaction from './AddTransaction/AddTransaction';
import SpendingTracker from './SpendingTracker/SpendingTracker';
import BudgetContext from './BudgetContext';
import Signin from './Signin/Signin';
import Register from './Signin/Register';
import config from './config';
import { Route } from 'react-router-dom';
import './App.css';
import AddCategories from './AddCategory/AddCategories';
import ParticleConfig from './ParticleConfig'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'signup',
      signedIn: false,
      categories: [],
      transactions: [],
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        joined: ''
      }
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/categories`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `basic ${TokenService.getAuthToken()}`,
          // Authorization: `Bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/transactions`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `basic ${TokenService.getAuthToken()}`,
          // Authorization: `Bearer ${config.API_KEY}`
        }
      })
    ])
      .then(([categoriesRes, transactionsRes]) => {
        if (!categoriesRes.ok) return categoriesRes.json().then(event => Promise.reject(event));
        if (!transactionsRes.ok) return transactionsRes.json().then(event => Promise.reject(event));
        return Promise.all([categoriesRes.json(), transactionsRes.json()]);
      })
      .then(([categories, transactions]) => {
        this.setState({  categories, transactions} );
      })
      .catch(error => {
        console.log(error);
      });
  }
  loadUser = userInfo => {
    this.setState({
      user: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        joined: userInfo.joined,
        categories: [],
        transactions: [],
      }
    });
  };
  addTransaction = transaction => {
    this.setState({
      transactions: [...this.state.transactions, transaction]
    });
  };

  addCategory = category => {
    this.setState({
      categories: [...this.state.categories, category]
    });
  };

  deleteCategory = categoryId => {
    this.setState({
      categories: this.state.categories.filter(category => category.id !== categoryId)
    });
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ signedIn: false });
    } else if (route === 'home') {
      this.setState({ signedIn: true });
    }
    this.setState({
      route: route
    });
  };

  render() {

    const value = {
      categories: this.state.categories,
      transactions: this.state.transactions,
      addTransaction: this.addTransaction,
      addCategory: this.addCategory,
      deleteCategory: this.deleteCategory,
      totalCost: this.state.transactions.map(transaction => parseFloat(transaction.amount)).reduce((a, b) => a + b, 0)
    };
    const { signedIn } = this.state;
    const { route } = this.state;

    return (
      <BudgetContext.Provider value={value}>
        <main className="App">
          <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange} />

          {route === 'home' ? (
            <div className="App-Container">
              <h1>Simple Budget</h1>
              <Route exact path="/" component={AddCategories} />
              <Route exact path="/" component={AddTransaction} />
              <Route exact path="/track" component={SpendingTracker} />
            </div>
          ) : route === 'signup' ? (
            <div>
              <ParticleConfig/>
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          ) : (
            <div>
            <ParticleConfig/>
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          )}
        </main>
      </BudgetContext.Provider>
    );
  }
}

export default App;
