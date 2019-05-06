/* library */
import React, {Component, PropTypes} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer, inject } from 'mobx-react';
import { ClipLoader } from 'react-spinners'

/* style */
import './TodoList.sass';

/* component */
import ListItem from '../ListItem/ListItem.js'


@inject('TodoListStore')
@inject('AuthStore')
@observer
class TodoList extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      headName: '',
    }
  }

  componentDidMount () {
    if (this.props.AuthStore.user) {
      const userId = this.props.AuthStore.user.uid;
      this.props.TodoListStore.fetchTaskListByUserId(userId);
    }
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  taskDoneFireBaseHandler = ( taskId ) => {
    this.props.TodoListStore.taskDone( taskId );
  }

  renderTasks = () => {
    return(
      <>{
        this.props.TodoListStore.tasks.map(( item, index ) => {
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
    const taskName = this.state.headName;
    const newTask = {
      isDone: false,
      name: taskName,
    }

    this.props.TodoListStore.addTask( newTask )
      .then(() => {
        this.setState({
          headName: '',
        });
      });
  }

  clearTaskFireBaseHandler = () => {
    this.props.TodoListStore.removeAllTasks();
  }

  renderSpinner = () => {
    return(
        <ClipLoader
          sizeUnit={"px"}
          size={100}
          color={'#123abc'}
          loading={true}
        />
    );
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
              { !this.props.TodoListStore.isFetching && this.props.TodoListStore.tasks  ? this.renderTasks() 
                                                                                        : this.renderSpinner() }
            </div>

        </div>
    )
  }
}

export default TodoList;