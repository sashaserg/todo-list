import React, {Component, PropTypes} from 'react';
import './ShoppingListWindow.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';
import ShoppingListItem from '../../components/ShoppingListItem/ShoppingListItem.js'
import Draggable, {DraggableCore} from 'react-draggable';

class ShoppingListWindow extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      headName: '',
      headAmount: null,
      headCost: null,
      budget: 0,
      spent: 0,
      shopItems: [],
    }
  }

  addNewShopItemFromState = () => {
    const name = this.state.headName;
    const amount = this.state.headAmount;
    const cost = this.state.headCost;

    if( name && amount && cost )
    {
      const newShopItem = {
        name,
        amount,
        cost,
        isDone: false,
      }
  
      const newShopItems = this.state.shopItems;
      newShopItems.push(newShopItem);
  
      this.setState({
        shopItems: newShopItems,
  
        headName: '',
        headAmount: null,
        headCost: null,
      });

      // After success focus on Head Name Field
      document.getElementsByName('headName')[0].focus();
    }
    else {

      // Focus on first empty input with div className='headInput'
      const emptyInputs = Array.from(document.getElementsByClassName('headInput')).filter((item) => {
        if(!item.firstChild.value && item.firstChild.nodeName == 'INPUT'){
          return true
        }
      });
      emptyInputs[0].firstChild.focus();
    }
  }

  shopItemDoneHandler = (itemIndex, { fName, fAmount, fCost }) => {
    const newShopItems = this.state.shopItems;

    const shopItem = newShopItems[itemIndex];
    shopItem.isDone = !shopItem.isDone;

    this.setState({
        spent: this.state.spent + shopItem.cost * shopItem.amount,
        shopItems: newShopItems,
    });
  }

  shopItemInputChangeHandler = (itemIndex) => {
    const newShopItems = this.state.shopItems;

    // this.setState({
    //     [e.target.name]: e.target.value
    // });
  }

  renderShopItems = () => {
    return (
      <>
        { this.state.shopItems.map((item, index) => {
          return <ShoppingListItem  key         = {index}
                                    index       = {index}
                                    name        = {item.name}
                                    amount      = {item.amount}
                                    cost        = {item.cost}
                                    isDone      = {item.isDone}
                                    doneHandler = {this.shopItemDoneHandler}/>
        })}
      </>
    );
  }

  headInputChangeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  headInputKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      this.addNewShopItemFromState();
    }
  }

  render()
  {
    return (
        <div className='ShoppingListWindow-container'>  
          <div className='headPanel'>
            <div className='headInput nameInput'>
              <input placeholder  = {'Name...'}
                     name         = {'headName'}
                     value        = {this.state.headName}
                     onChange     = {this.headInputChangeHandler}
                     onKeyDown    = {this.headInputKeyDownHandler}/>
            </div>
            <div className='headInput'>
              <NumberFormat decimalScale  = {0} 
                            placeholder   = {'Amount...'} 
                            allowNegative = {false}
                            name          = {'headAmount'}
                            value         = {this.state.headAmount}
                            onChange      = {this.headInputChangeHandler}
                            onKeyDown     = {this.headInputKeyDownHandler}/>

              {/* <input placeholder='Amount...'  type   = {'number'} 
                                              min    = {'1'} 
                                              max    = {'1000'} 
                                              step   = {'1'}></input> */}
            </div>
            <div className='headInput'>
              <NumberFormat decimalScale      = {2} 
                            fixedDecimalScale = {true} 
                            allowNegative     = {false}
                            placeholder       = {'Cost...'}
                            name              = {'headCost'}
                            value             = {this.state.headCost}
                            onChange          = {this.headInputChangeHandler}
                            onKeyDown         = {this.headInputKeyDownHandler}/>
            </div>
            <button className='headInput addButton' 
                    onClick={this.addNewShopItemFromState}>Add</button>
          </div>

          <div className='itemPanel'>
            { this.renderShopItems() }
          </div>

          <Draggable cancel = "strong" bounds='body'>
            <div className = 'controlPanel'>
              <div className='controlRow'>
                <div className='iconField'><FontAwesomeIcon icon='wallet'/></div>
                <div className='numberField'>
                  <strong>
                    <NumberFormat decimalScale      = {2} 
                                  fixedDecimalScale = {true} 
                                  allowNegative     = {false}
                                  value             = {this.state.budget}
                                  name              = {'budget'}
                                  // prefix            = {'₴'}
                                  prefix            = {'$'}
                                  onChange          = {this.headInputChangeHandler}
                                  placeholder       = {'Budget'}/>
                  </strong>
                </div>
              </div>
              <div className='controlRow'>
                <div className='iconField'><FontAwesomeIcon icon='shopping-bag'/></div>
                <div className='numberField'>
                  <NumberFormat decimalScale      = {2} 
                                fixedDecimalScale = {true} 
                                allowNegative     = {false}
                                value             = {this.state.spent}
                                displayType       = {'text'}
                                prefix            = {'$'}
                                defaultValue      = {0}/>
                </div>
              </div>
            </div>
          </Draggable>
        </div>
    )
  }
}

export default ShoppingListWindow;