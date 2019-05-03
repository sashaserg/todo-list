import React, {Component, PropTypes} from 'react';
import './Header.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import ShoppingListStore from '../../stores/ShoppingListStore.js';
import AuthStore from '../../stores/AuthStore.js';
import { observer } from 'mobx-react';

@observer
class Header extends Component
{
  loginBtnHandler = () => {
    AuthStore.login();
  }
  logoutBtnHandler = () => {
    AuthStore.logout();
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
                AuthStore.user  ? <button onClick={this.logoutBtnHandler}>Sign out</button> 
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