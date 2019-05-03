import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Main from './views/Main/Main.js';
import Header from './components/Header/Header.js';
import ToDoWindow from './views/ToDoWindow/ToDoWindow.js';
import ShoppingListWindow from './views/ShoppingListWindow/ShoppingListWindow.js';
import NotFound from './views/NotFound/NotFound';
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

import firebase, { auth, provider } from './firebase.js';

/* stores */
import ShoppingListStore from './stores/ShoppingListStore.js';
import AuthStore from './stores/AuthStore.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrashAlt, faHome,  faShoppingBag, faWallet, faShoppingBasket, faListOl, faSmile, faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons'
library.add( faCheck, faTrashAlt, faHome, faShoppingBag, faWallet, faShoppingBasket, faListOl, faDollarSign,faSmile, faTimes  );

const stores = { ShoppingListStore };

class App extends Component {
  componentDidMount () {

    auth.onAuthStateChanged((user) => {
      if (user) {
        AuthStore.user = user;
      } 
    });

  }
  
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
        <DevTools />
      </Router>
    );
  }
}

export default App;
