import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header';
import Home from './components/home/Home';
import Checkout from './components/checkout/Checkout';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home/>
          </Route>
          <Route exact path="/checkout">
          <Header />
           <Checkout/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
