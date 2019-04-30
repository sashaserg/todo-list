import React, {Component, PropTypes} from 'react';
import './ShoppingListWindow.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';
import ShoppingListItem from '../../components/ShoppingListItem/ShoppingListItem.js';
import WhiteShoppingListItem from '../../components/WhiteShoppingListItem/WhiteShoppingListItem.js';
import Draggable, {DraggableCore} from 'react-draggable';
import ReactTooltip from 'react-tooltip';
import firebase from '../../firebase.js';

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
    };

  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('ShoppingList');
    itemsRef.on('value', (snapshot) => {
      if (snapshot.val())
      {
        let items = snapshot.val().ShoppingItem;
        let newShopItems = [];
        for (let item in items) {
          newShopItems.push({
            id: item,
            name: items[item].name,
            amount: items[item].amount,
            cost: items[item].cost,
            isDone: items[item].isDone,
          });
        };

        const budget = snapshot.val().budget;
        const spent = snapshot.val().spent;

        this.setState({
          shopItems: newShopItems,
          budget,
          spent
        });
      }
    });

    itemsRef.child('ShoppingItem').on('child_removed', (oldChild) => {
      if (oldChild.val().isDone)
        itemsRef.once('value')
          .then((snapshot) => {
            const oldSpent = snapshot.val().spent;
            itemsRef.update({
              spent: oldSpent - oldChild.val().amount * oldChild.val().cost,
            })
          })
    });
  }

  addNewShopItemToFireBase = () => {
    const name = this.state.headName;
    const amount = this.state.headAmount;
    const cost = this.state.headCost;

    if( name && amount && cost )
    {
      const itemsRef = firebase.database().ref('ShoppingList').child('ShoppingItem');
      const item = {
        name,
        amount,
        cost,
        isDone: false,
      };

      itemsRef.push(item);

      this.setState({
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


  checkBudgetSpent = () => {
    console.log('spent: ', this.state.spent, 'budget: ', this.state.budget)
    
    if ( this.state.spent > this.state.budget ) {
      
      // Set Tooltip disable to false to show it. 
      document.getElementById('controlPanel').setAttribute('data-tip-disable', false)
      ReactTooltip.show(document.getElementById('controlPanel'));
      setTimeout(() => { 
        ReactTooltip.hide(document.getElementById('controlPanel'));
        // Set Tooltip disable to true to prevent hover-show. 
        document.getElementById('controlPanel').setAttribute('data-tip-disable', true) 
      }, 0);
    }
  }

  shopItemDoneHandler = ( itemIndex ) => {
    const newShopItems = this.state.shopItems;

    const shopItem = newShopItems[ itemIndex ];
    shopItem.isDone = !shopItem.isDone;
    let sumAddToSpent = shopItem.cost * shopItem.amount;

    // If we change done to undone, we should subtract amount*cost from total spent
    if( !shopItem.isDone ) sumAddToSpent *= -1;

    this.setState({
        shopItems: newShopItems,
        spent: this.state.spent + sumAddToSpent,
    }, () => this.checkBudgetSpent() );

  }

  shopItemDoneFireBaseHandler = ( itemId ) => {
    const itemRef = firebase.database().ref('ShoppingList');

    itemRef.once('value').then(function(snapshot) {
      const itemIsDone = !snapshot.val().ShoppingItem[itemId].isDone;
      const spent = snapshot.val().spent;
      let sumAddToSpent = snapshot.val().ShoppingItem[itemId].cost *
                          snapshot.val().ShoppingItem[itemId].amount;
                    
      // If we change done to undone, we should subtract amount*cost from total spent
      if( !itemIsDone ) sumAddToSpent *= -1;

      itemRef.child('ShoppingItem').child(itemId).update({
        isDone: itemIsDone
      });

      itemRef.update({
        spent: spent + sumAddToSpent,
      });

    });

    // const itemRef = firebase.database().ref(`/ShoppingList/ShoppingItem/${itemId}`);

    // itemRef.once('value').then(function(snapshot) {
    //   const itemIsDone = !snapshot.val().isDone;

    //   let sumAddToSpent = snapshot.val().cost * snapshot.val().amount;

    //   // If we change done to undone, we should subtract amount*cost from total spent
    //   if( !itemIsDone ) sumAddToSpent *= -1;

    //   itemRef.update({
    //     isDone: itemIsDone,
    //   });

    //   this.setState({
    //     spent: this.state.spent + sumAddToSpent,
    //   });

    // });
  }

  shopItemRemoveHandler = ( itemIndex ) => {
    const newShopItems = this.state.shopItems;
    const shopItem = newShopItems[ itemIndex ];
    const subtractFromSpent = shopItem.isDone ? shopItem.cost * shopItem.amount : 0;

    newShopItems.splice( itemIndex, 1 );
    console.log(newShopItems);

    this.setState({
      spent: this.state.spent - subtractFromSpent,
      shopItems: newShopItems, 
    });
  }

  shopItemRemoveFromFirebaseHandler = ( itemId ) => {
    const itemRef = firebase.database().ref(`/ShoppingList/ShoppingItem/${itemId}`);
    itemRef.remove();
  }

  shopItemChangeHandler = ( itemIndex, fieldName, newValue ) => {
    const newShopItems = this.state.shopItems;
    
    // Create copy of item before updating without object reference.
    const oldShopItem = JSON.parse(JSON.stringify( newShopItems[ itemIndex ] ));
    let sumAddToSpent = 0;

    newShopItems[ itemIndex ][ fieldName ] = newValue;

    if( oldShopItem.isDone )
      sumAddToSpent = newShopItems[itemIndex].amount * newShopItems[itemIndex].cost
                      -
                      oldShopItem.amount * oldShopItem.cost; 
    this.setState({
      shopItems: newShopItems,
      spent: this.state.spent + sumAddToSpent,
    }, () => this.checkBudgetSpent() );

  }

  shopItemChangeFireBaseHandler = ( itemId, fieldName, fieldValue ) => {
    const itemRef = firebase.database().ref(`/ShoppingList/ShoppingItem/${itemId}`);
    itemRef.update({
      [fieldName]: fieldValue 
    });
  }

  renderShopItems = () => {
    return (
      <>
        { this.state.shopItems.map((item, index) => {
          return <WhiteShoppingListItem   key                 = {index}
                                          index               = {index}
                                          id                  = {item.id}
                                          name                = {item.name}
                                          amount              = {item.amount}
                                          cost                = {item.cost}
                                          isDone              = {item.isDone}
                                          inputChangeHandler  = {this.shopItemChangeFireBaseHandler}
                                          doneHandler         = {this.shopItemDoneFireBaseHandler}
                                          removeHandler       = {this.shopItemRemoveFromFirebaseHandler}/>
        })}
      </>
    );
  }

  headInputStringChangeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  headInputNumericChangeHandler = (e) => {
    this.setState({
        [e.target.name]: parseFloat( e.target.value ),
    });
  }

  headInputKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      this.addNewShopItemToFireBase();
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
                     onChange     = {this.headInputStringChangeHandler}
                     onKeyDown    = {this.headInputKeyDownHandler}/>
            </div>
            <div className='headInput'>
              <NumberFormat decimalScale  = {0} 
                            placeholder   = {'Amount...'} 
                            allowNegative = {false}
                            name          = {'headAmount'}
                            value         = {this.state.headAmount}
                            onChange      = {this.headInputNumericChangeHandler}
                            onKeyDown     = {this.headInputKeyDownHandler}/>
            </div>
            <div className='headInput'>
              <NumberFormat decimalScale      = {2} 
                            fixedDecimalScale = {true} 
                            allowNegative     = {false}
                            placeholder       = {'Cost...'}
                            name              = {'headCost'}
                            value             = {this.state.headCost}
                            onChange          = {this.headInputNumericChangeHandler}
                            onKeyDown         = {this.headInputKeyDownHandler}/>
            </div>
            <button className='headInput addButton' 
                    onClick={this.addNewShopItemToFireBase}>Add</button>
          </div>

          <div className='itemPanel'>
            { this.renderShopItems() }
          </div>

          <Draggable cancel = "strong" bounds='body'>
            <div className = 'controlPanel' data-tip id={'controlPanel'} data-tip-disable>
              <ReactTooltip place     = "left" 
                            type      = "warning" 
                            effect    = "solid" 
                            delayHide = {1800}>
                <span>You spent more than in budget</span>
              </ReactTooltip>
              <div className='controlRow'>
                <div className='iconField'><FontAwesomeIcon icon='wallet'/></div>
                <div className='numberField'>
                  <strong>
                    <NumberFormat decimalScale      = {2} 
                                  fixedDecimalScale = {true} 
                                  allowNegative     = {false}
                                  value             = {this.state.budget}
                                  name              = {'budget'}
                                  onChange          = {this.headInputChangeHandler}
                                  placeholder       = {'Budget'}/>
                  </strong>
                </div>
                <div className='postfixField'><FontAwesomeIcon icon='dollar-sign'/></div>
              </div>
              <div className='controlRow'>
                <div className='iconField'><FontAwesomeIcon icon='shopping-bag'/></div>
                <div className='numberField'>
                  <NumberFormat decimalScale      = {2} 
                                fixedDecimalScale = {true} 
                                allowNegative     = {false}
                                value             = {this.state.spent}
                                displayType       = {'text'}
                                defaultValue      = {0}/>
                </div>
                <div className='postfixField'><FontAwesomeIcon icon='dollar-sign'/></div>
              </div>
            </div>
          </Draggable>
        </div>
    )
  }
}

export default ShoppingListWindow;