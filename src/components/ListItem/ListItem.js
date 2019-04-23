import React, {Component, PropTypes} from 'react';
import './ListItem.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListItem extends Component
{
    constructor(props) {
        super(props);
        // this.doneBtnHandler = this.doneBtnHandler.bind(this);
    }

    doneBtnHandler = () => {
        this.props.doneHandler( this.props.index );
    }

  render()
  {
    const doneClassForName = this.props.isDone ? ' doneName' : '';
    const doneClassForBG = this.props.isDone ? ' doneBG' : '';
    return (
        <div className={'ListItem-container' + doneClassForBG}>
            <div className='doneDiv' onClick={this.doneBtnHandler}>
                <span className='doneBtn'>
                    <FontAwesomeIcon icon='check'/>
                </span>
            </div>
            <div className='separator'></div>
            <div className='taskName'>
                <span className={ doneClassForName }>{ this.props.name }</span>
            </div> 
        </div>
    )
  }
}

export default ListItem;