import React, {Component, PropTypes} from 'react';
import './OptionCard.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

class OptionCard extends Component
{
  cardClickHandler = () => {
    this.props.clickHandler( this.props. optionPath );
  }

  render()
  {
    const { optionName, optionIcon } = this.props;
    return (
        <div className={'OptionCard-container'} onClick={this.cardClickHandler}>
            <div className={'optionIcon'}>
                <FontAwesomeIcon icon={optionIcon}/>
            </div>
            <p className={'optionName'}>{optionName}</p>
        </div>
    )
  }
}

export default OptionCard;