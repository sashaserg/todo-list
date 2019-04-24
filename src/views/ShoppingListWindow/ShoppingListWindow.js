import React, {Component, PropTypes} from 'react';
import './ShoppingListWindow.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ShoppingListWindow extends Component
{
  constructor(props) {
    super(props);
  }

  render()
  {
    return (
        <div className='ShoppingListWindow-container'>
          
          <div className='headPanel'>

            <div className='headInput nameInput'>
              <input placeholder='Name...'></input>
            </div>

            <div className='headInput'>
              <input placeholder='Amount...'></input>
            </div>

            <div className='headInput'>
              <input placeholder='Cost...'></input>
            </div>

            <button className='headInput addButton'>Add</button>

          </div>

          <div className='itemPanel'>
            
          </div>

          <div className='controlPanel'>
            <div className='controlRow'>
              <div className='iconField'><FontAwesomeIcon icon='wallet'/></div>
              <div className='numberField'><input placeholder='Budget...'></input></div>
            </div>
            <div className='controlRow'>
              <div className='iconField'><FontAwesomeIcon icon='shopping-bag'/></div>
              <div className='numberField'><p>2000.00</p></div>
            </div>
          </div>

        </div>
    )
  }
}

export default ShoppingListWindow;