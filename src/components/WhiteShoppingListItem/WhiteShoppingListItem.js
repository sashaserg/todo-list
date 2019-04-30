import React, {Component, PropTypes} from 'react';
import './WhiteShoppingListItem.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';

class WhiteShoppingListItem extends Component
{
    doneBtnHandler = () => {
        this.props.doneHandler( this.props.id );
    }
    removeBtnHandler = () => {
        this.props.removeHandler( this.props.id );
    }
    inputChangeHandler = (e) => {
        this.props.inputChangeHandler( this.props.id, e.target.name, e.target.value )
    }

    render()
    {
        const doneClassForBtn = this.props.isDone ? ' doneBtn' : '';
        const doneClassForInput = this.props.isDone ? ' doneInput' : '';

        return (
            <div className={'WhiteShoppingListItem-container'}>
                <div className={'buttonPanel'}>
                    <div className={'buttonField acceptIcon' + doneClassForBtn} onClick={this.doneBtnHandler}><FontAwesomeIcon icon={'check'}/></div>
                    <div className={'buttonField removeIcon'} onClick={this.removeBtnHandler}><FontAwesomeIcon icon={'times'}/></div>
                </div>
                <div className={'inputPanel'}>
                    <div className={'inputField nameField'}>
                        <input  onChange     = {this.inputChangeHandler}
                                onKeyDown    = {this.keyDownHandler}
                                className    = {doneClassForInput} 
                                value        = {this.props.name}
                                name         = {'name'}
                                disabled     = {this.props.isDone}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale    = {0} 
                                        className       = {doneClassForInput}        
                                        allowNegative   = {false}
                                        value           = {this.props.amount}
                                        onChange        = {this.inputChangeHandler}
                                        onKeyDown       = {this.keyDownHandler}
                                        name            = {'amount'}
                                        disabled     = {this.props.isDone}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale        = {2}
                                        className           = {doneClassForInput} 
                                        fixedDecimalScale   = {true} 
                                        allowNegative       = {false}
                                        value               = {this.props.cost}
                                        onChange            = {this.inputChangeHandler}
                                        onKeyDown           = {this.keyDownHandler}
                                        name                = {'cost'}
                                        disabled     = {this.props.isDone}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WhiteShoppingListItem;