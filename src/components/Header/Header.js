import React, {Component, PropTypes} from 'react';
import './Header.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

class Header extends Component
{
  render()
  {
    return (
        <div className='Header-container'>
            <div className='content'>
              <div className='homeIcon'>
                <Link to={'/'}>
                  <FontAwesomeIcon icon='home' className='icon'/>
                </Link>
              </div>
              <p className='headerText'>Be Organized</p>
            </div>
        </div>
    )
  }
}

export default Header;