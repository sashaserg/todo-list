import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Main from './views/Main/Main.js';
import Header from './components/Header/Header.js';
import ToDoWindow from './views/ToDoWindow/ToDoWindow.js';
import ShoppingListWindow from './views/ShoppingListWindow/ShoppingListWindow.js';
import NotFound from './views/NotFound/NotFound';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrashAlt, faHome,  faShoppingBag, faWallet, faShoppingBasket, faListOl, faSmile, faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons'
library.add( faCheck, faTrashAlt, faHome, faShoppingBag, faWallet, faShoppingBasket, faListOl, faDollarSign,faSmile, faTimes  );

class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/todoList' component={() => <Main component={ToDoWindow}/>}/>
          <Route path='/shoppingList' component={() => <Main component={ShoppingListWindow}/>}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
