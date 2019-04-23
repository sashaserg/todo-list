import React, {Component, PropTypes} from 'react';
import './Main.sass';
import TodoList from '../../components/TodoList/TodoList.js'

class Main extends Component
{
  render()
  {
    return (
        <div className='Main-container'>
            <div className='content'>
              <TodoList/>
            </div>
        </div>
    )
  }
}

export default Main;