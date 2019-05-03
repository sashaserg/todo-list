/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* style */
import './ListItem.sass';

class ListItem extends Component
{
    constructor(props) {
        super(props);
        // this.doneBtnHandler = this.doneBtnHandler.bind(this);
    }

    doneBtnHandler = () => {
        this.props.doneHandler( this.props.id );
    }

  render() {
    const doneClassForName = this.props.isDone ? ' doneName' : '';
    const doneClassForBG = this.props.isDone ? ' doneBG' : '';
    return (
        <div className={'ListItem-container'}>
            <div className={'doneDiv'} onClick={this.doneBtnHandler}>
                <span className={'doneBtn' + doneClassForBG}>
                    <FontAwesomeIcon icon='check'/>
                </span>
            </div>
            <div className='separator'></div>
            <div className='taskName'>
                <p className={ doneClassForName }>{ this.props.name }</p>
            </div> 
        </div>
    )
  }
}

export default ListItem;