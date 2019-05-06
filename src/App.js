/* library */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

/* component */
import Main from './views/Main/Main.js';
import Header from './components/Header/Header.js';
import ToDoWindow from './views/ToDoWindow/ToDoWindow.js';
import ShoppingListWindow from './views/ShoppingListWindow/ShoppingListWindow.js';
import NotFound from './views/NotFound/NotFound';

/* stores */
import { stores } from './stores'; 

/* style */
import './App.css';

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrashAlt, faHome,  faShoppingBag, faWallet, faShoppingBasket, faListOl, faSmile, faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons'
library.add( faCheck, faTrashAlt, faHome, faShoppingBag, faWallet, faShoppingBasket, faListOl, faDollarSign,faSmile, faTimes  );

class App extends Component {
  componentDidMount() {
    // Hardcoded to show spinner in Main.js container when cur.user is fetching. 
    stores.AuthStore.isFetching = true;
  }
  render() {
    return (
        <Provider {...stores}>
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
        </Provider>
    );
  }
}

export default App;
