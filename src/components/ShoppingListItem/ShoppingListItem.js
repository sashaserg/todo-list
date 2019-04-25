import React, {Component, PropTypes} from 'react';
import './ShoppingListItem.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';

class ShoppingListItem extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            amount: this.props.amount,
            cost: this.props.cost,
        }
        this.doneBtnHandler = this.doneBtnHandler.bind(this);
    }

    doneBtnHandler = () => {
        this.props.doneHandler( this.props.index, this.state );
    }

  render()
  {
    const doneClassForBtn = this.props.isDone ? ' doneBtn' : '';
    return (
        <div className={'ShoppingListItem-container'}>
            <div className={'buttonPanel'}>
                <div className={'buttonField acceptIcon' + doneClassForBtn} onClick={this.doneBtnHandler}><FontAwesomeIcon icon={'check'}/></div>
                <div className={'buttonField removeIcon'}><FontAwesomeIcon icon={'times'}/></div>
            </div> 
            <div className={'inputPanel'}>
                <div className={'inputField nameField'}>
                    <input  onChange     = {this.inputChangeHandler}
                            onKeyDown    = {this.keyDownHandler}
                            value        = {this.state.name}/>
                </div>
                <div className={'inputField'}>
                    <NumberFormat   decimalScale    = {0} 
                                    allowNegative   = {false}
                                    value           = {this.state.amount}
                                    onChange        = {this.inputChangeHandler}
                                    onKeyDown       = {this.keyDownHandler}/>
                </div>
                <div className={'inputField'}>
                    <NumberFormat   decimalScale        = {2}
                                    fixedDecimalScale   = {true} 
                                    allowNegative       = {false}
                                    value               = {this.state.cost}
                                    onChange            = {this.inputChangeHandler}
                                    onKeyDown           = {this.keyDownHandler}/>
                </div>
            </div>
        </div>
    )
  }
}

export default ShoppingListItem;