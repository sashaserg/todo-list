import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './views/Main/Main.js';
import Header from './components/Header/Header.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
library.add( faCheck, faTrashAlt );

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
      </>
    );
  }
}

export default App;
