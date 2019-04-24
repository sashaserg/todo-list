import React, {Component, PropTypes} from 'react';
import './ShoppingListItem.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ShoppingListItem extends Component
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
        <div className={'ShoppingListItem-container'}>
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

export default ShoppingListItem;