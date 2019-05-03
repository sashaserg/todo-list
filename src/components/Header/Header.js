/* library */
import React, {Component, PropTypes} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { observer, inject } from 'mobx-react';

/* style */
import './Header.sass';

/* store */
import ShoppingListStore from '../../stores/ShoppingListStore.js';
import AuthStore from '../../stores/AuthStore.js';

@inject('AuthStore')
@observer
class Header extends Component
{
  loginBtnHandler = () => {
    this.props.AuthStore.login();
  }
  logoutBtnHandler = () => {
    this.props.AuthStore.logout();
  }
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
              <div className='authBlock'>
              {
                this.props.AuthStore.user ? <button onClick={this.logoutBtnHandler}>Sign out</button> 
                                          :
                                            <button onClick={this.loginBtnHandler}>Sign in</button>
              }
            </div>
            </div>
        </div>
    )
  }
}

export default Header;