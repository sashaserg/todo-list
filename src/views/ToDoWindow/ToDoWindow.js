import React, {Component, PropTypes} from 'react';
import './ToDoWindow.sass';
import TodoList from '../../components/TodoList/TodoList.js'

class ToDoWindow extends Component
{
  render()
  {
    return (
        <div className='ToDoWindow-container'>
            <TodoList/>
        </div>
    )
  }
}

export default ToDoWindow;