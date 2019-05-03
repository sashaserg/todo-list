/* library */
import React, {Component, PropTypes} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';

/* style */
import './ShoppingListItem.sass';

class ShoppingListItem extends Component
{
    doneBtnHandler = () => {
        this.props.doneHandler( this.props.index );
    }
    removeBtnHandler = () => {
        this.props.removeHandler( this.props. index );
    }
    inputChangeHandler = (e) => {
        this.props.inputChangeHandler( this.props.index, e.target.name, e.target.value )
    }

    render() {
        const doneClassForBtn = this.props.isDone ? ' doneBtn' : '';
        return (
            <div className={'ShoppingListItem-container'}>
                <div className={'buttonPanel'}>
                    <div className={'buttonField acceptIcon' + doneClassForBtn} onClick={this.doneBtnHandler}><FontAwesomeIcon icon={'check'}/></div>
                    <div className={'buttonField removeIcon'} onClick={this.removeBtnHandler}><FontAwesomeIcon icon={'times'}/></div>
                </div> 
                <div className={'inputPanel'}>
                    <div className={'inputField nameField'}>
                        <input  onChange     = {this.inputChangeHandler}
                                onKeyDown    = {this.keyDownHandler}
                                value        = {this.props.name}
                                name         = {'name'}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale    = {0} 
                                        allowNegative   = {false}
                                        value           = {this.props.amount}
                                        onChange        = {this.inputChangeHandler}
                                        onKeyDown       = {this.keyDownHandler}
                                        name            = {'amount'}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale        = {2}
                                        fixedDecimalScale   = {true} 
                                        allowNegative       = {false}
                                        value               = {this.props.cost}
                                        onChange            = {this.inputChangeHandler}
                                        onKeyDown           = {this.keyDownHandler}
                                        name                = {'cost'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShoppingListItem;