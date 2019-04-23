import React, {Component, PropTypes} from 'react';
import './TodoList.sass';
import ListItem from '../ListItem/ListItem.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TodoList extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    }

    // this.taskDoneHandler = this.taskDoneHandler.bind(this);
  }

  taskDoneHandler = ( taskIndex ) => {
    const updatedTasks = this.state.tasks;
    updatedTasks[taskIndex].isDone = true;

    this.setState({
      tasks: updatedTasks,
    })
    console.log( this.state.tasks );
  }

  renderTasks = () => {
    return(
      <>{
        this.state.tasks.map(( item, index ) => {
          return <ListItem key          = { index } 
                           name         = { item.name } 
                           isDone       = { item.isDone }
                           index        = { index }
                           doneHandler  = { this.taskDoneHandler }/>
        })
      }</>
    )
  }

  keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const taskName = e.target.value;
      const newTask = {
        isDone: false,
        name: taskName,
      }

      const newTasks = this.state.tasks;
      newTasks.push(newTask);

      this.setState({
        tasks: newTasks
      });

      e.target.value = '';
    }
  }

  clearTaskHandler = () => {
    if( this.state.tasks.length > 0 )
      this.setState({
        tasks: [],
      }); 
  }

  render()
  {
    return (
        <div className='TodoList-container'>
            <div className='clearBtn' onClick={this.clearTaskHandler}>
              <FontAwesomeIcon icon='trash-alt'/>
            </div>
            <div className='taskCreator'>
              <input placeholder='+  Add new item' onKeyDown={this.keyDownHandler}></input>
            </div>
            <div className='tasks'>
              { this.renderTasks() }
            </div>
        </div>
    )
  }
}

export default TodoList;