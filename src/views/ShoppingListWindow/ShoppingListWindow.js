/* library */
import React, {Component, PropTypes} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';
import Draggable, {DraggableCore} from 'react-draggable';
import ReactTooltip from 'react-tooltip';
import { ClipLoader } from 'react-spinners';
import { observer, inject } from 'mobx-react';

/* component */
import WhiteShoppingListItem from '../../components/WhiteShoppingListItem/WhiteShoppingListItem.js';

/* style */
import './ShoppingListWindow.sass';

@inject('ShoppingListStore')
@inject('AuthStore')
@observer
class ShoppingListWindow extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      headName: '',
      headAmount: null,
      headCost: null,
    };
  }

  componentDidMount() {
    // this.props.ShoppingListStore.fetchShoppingList();
    const uid = this.props.AuthStore.user.uid;

    this.props.ShoppingListStore.findShoppingListByUserId(uid);
  }

  // Add new shop item to firebase using data from state.
  addNewShopItemToFireBase = () => {
    const name = this.state.headName;
    const amount = this.state.headAmount;
    const cost = this.state.headCost;

    if( name && amount && cost )
    {
      const newItem = {
        name,
        amount,
        cost, 
        isDone: false,
      }
      // this.props.ShoppingListStore.addNewShopItemUserId( this.props.AuthStore.user.uid );
      this.props.ShoppingListStore.addNewShopItem( newItem )
        .then(() => {
          document.getElementsByName('headName')[0].focus();
          // After success set head state to null and focus on Head Name Field.
          this.setState({
            headName: '',
            headAmount: null,
            headCost: null,
          });
        })
        .catch((err) => {
          console.log(err);
        });  
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

  // Check budget and spent. If spent > budget, show tooltip with warning.
  checkBudgetSpent = () => {
     console.log('spent: ', this.props.ShoppingListStore.spent, 'budget: ', this.props.ShoppingListStore.budget)
    
    if ( this.props.ShoppingListStore.spent > this.props.ShoppingListStore.budget ) {
      
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

  // Handler for item done button. Updating item's isDone status and global spent. 
  shopItemDoneFireBaseHandler = ( itemId ) => {
    this.props.ShoppingListStore.updateIsDoneShopItem( itemId )
      .then(() => {
        this.checkBudgetSpent();
      })
  }

  // Remove shopItem from firebase and check budget and spent. 
  shopItemRemoveFromFirebaseHandler = ( itemId ) => {
    this.props.ShoppingListStore.removeShopItem( itemId )
      .then(() => {
        this.checkBudgetSpent();
      })
  }

  // Update changed data in shopItem in firebase.
  shopItemChangeFireBaseHandler = ( itemId, fieldName, fieldValue ) => {
    this.props.ShoppingListStore.updateShopItem( itemId, fieldName, fieldValue );
  }

  // Render shopping items from ShoppingListStore. 
  renderShopItems = () => {
    return (
      <>
        { this.props.ShoppingListStore.shopItems.map((item, index) => {
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

  // Render spinner with loading props as true.
  renderSpinner = () => {
    return(
        <ClipLoader
          sizeUnit={"px"}
          size={100}
          color={'#123abc'}
          loading={true}
        />
    );
  }

  // Handler for budget input's onChange.
  budgetChangeFireBaseHandler = (e) => {
    const newBudget = parseFloat( e.target.value );
    this.props.ShoppingListStore.updateBudget( newBudget )
      .then(() => {
        this.checkBudgetSpent();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Handler for headInput onChange. Value type - string.  
  headInputStringChangeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  // Handler for headInput onChange. Value type - numeric.  
  headInputNumericChangeHandler = (e) => {
    this.setState({
        [e.target.name]: parseFloat( e.target.value ),
    });
  }

  // Handler for inputs onKeyDown. If Enter -> add new item to firebase.
  headInputKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      this.addNewShopItemToFireBase();
    }
  }

  render() {
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
            { !this.props.ShoppingListStore.isFetching && this.props.ShoppingListStore.shopItems  ? this.renderShopItems() 
                                                                                                  : this.renderSpinner() }
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
                                  value             = {this.props.ShoppingListStore.budget}
                                  name              = {'budget'}
                                  onChange          = {this.budgetChangeFireBaseHandler}
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
                                value             = {this.props.ShoppingListStore.spent}
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