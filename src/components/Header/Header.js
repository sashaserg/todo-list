import React, {Component, PropTypes} from 'react';
import './Header.sass';

class Header extends Component
{
  render()
  {
    return (
        <div className='Header-container'>
            <div className='content'>
              <p className='headerText'>ToDo List</p>
            </div>
        </div>
    )
  }
}

export default Header;