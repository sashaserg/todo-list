import React, {Component, PropTypes} from 'react';
import './TodoList.sass';
import ListItem from '../ListItem/ListItem.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from '../../firebase.js';

class TodoList extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      headName: '',
      tasks: [],
    }

    // this.taskDoneHandler = this.taskDoneHandler.bind(this);
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('TodoList').child('Task');
    itemsRef.on('value', (snapshot) => {
      let tasks = snapshot.val();
      let newTasks = [];
      for (let task in tasks) {
        newTasks.push({
          id: task,
          name: tasks[task].name,
          isDone: tasks[task].isDone,
        });
      }
      this.setState({
        tasks: newTasks,
      });
    });
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  taskDoneHandler = ( taskIndex ) => {
    const updatedTasks = this.state.tasks;
    updatedTasks[taskIndex].isDone = true;

    this.setState({
      tasks: updatedTasks,
    })
    console.log( this.state.tasks );
  }

  taskDoneFireBaseHandler = ( taskId ) => {
    const itemRef = firebase.database().ref(`/TodoList/Task/${taskId}`);
    itemRef.update({
      isDone: true,
    })
  }

  renderTasks = () => {
    return(
      <>{
        this.state.tasks.map(( item, index ) => {
          return <ListItem key          = { index } 
                           id           = { item.id }
                           name         = { item.name } 
                           isDone       = { item.isDone }
                           index        = { index }
                           doneHandler  = { this.taskDoneFireBaseHandler }/>
        })
      }</>
    )
  }

  keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      this.addNewTaskFireBase();
    }
  }

  addNewTaskFireBase = () => {
    const itemsRef = firebase.database().ref('TodoList').child('Task');
    const taskName = this.state.headName;
    const newTask = {
      isDone: false,
      name: taskName,
    }

    itemsRef.push(newTask);

    this.setState({
      headName: '',
    });
  }

  clearTaskHandler = () => {
    if( this.state.tasks.length > 0 )
      this.setState({
        tasks: [],
      }); 
  }

  clearTaskFireBaseHandler = () => {
    const itemsRef = firebase.database().ref('TodoList').child('Task');
    if (itemsRef)
      itemsRef.remove();
  }

  render()
  {
    return (
        <div className='TodoList-container'>

            <div className='clearBtn' onClick={this.clearTaskFireBaseHandler}>
              <FontAwesomeIcon icon='trash-alt'/>
            </div>

            <div className='taskCreator'>
              <input  placeholder = '+  Add new task' 
                      value       = {this.state.headName}
                      onKeyDown   = {this.keyDownHandler}
                      onChange    = {this.inputChangeHandler}
                      name        = {'headName'}/>
            </div>
            <div className='tasks'>
              { this.renderTasks() }
            </div>

        </div>
    )
  }
}

export default TodoList;