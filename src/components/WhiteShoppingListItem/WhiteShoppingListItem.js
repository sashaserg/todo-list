import React, {Component, PropTypes} from 'react';
import './WhiteShoppingListItem.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';

class WhiteShoppingListItem extends Component
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

    render()
    {
        return (
            <div className={'WhiteShoppingListItem-container'}>
                <div className={'buttonPanel'}>
                    <div className={'buttonField'}><FontAwesomeIcon icon={'check'}/></div>
                    <div className={'buttonField'}><FontAwesomeIcon icon={'times'}/></div>
                </div>
                <div className={'inputPanel'}>
                    <div className={'inputField nameField'}>
                        <input  value        = {123}
                                name         = {'name'}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale    = {0} 
                                        allowNegative   = {false}
                                        value           = {100}
                                        name            = {'amount'}/>
                    </div>
                    <div className={'inputField'}>
                        <NumberFormat   decimalScale        = {2}
                                        fixedDecimalScale   = {true} 
                                        allowNegative       = {false}
                                        value               = {100}
                                        name                = {'cost'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WhiteShoppingListItem;