/* library */
import React, {Component, PropTypes} from 'react';
import { Link, Route } from "react-router-dom";
import { observer } from 'mobx-react'

/* component */
import OptionCard from '../../components/OptionCard/OptionCard.js';

/* store */
import AuthStore from '../../stores/AuthStore.js';

/* style */
import './Main.sass';

@observer
class Main extends Component
{

  optionCardClickHandler = ( path ) => {
    if ( path ) {
      this.props.history.push( '/' + path );
    }
  }
 
  renderChooseWindow = () => {
    return (
      <div className='cardList'>
        <div className='cardContainer'><OptionCard optionName   = {'ToDo List'}
                                                   optionPath   = {'todoList'}
                                                   optionIcon   = {'list-ol'}
                                                   clickHandler = {this.optionCardClickHandler}/></div>
        <div className='cardContainer'><OptionCard optionName   = {'Shopping List'}
                                                   optionPath   = {'shoppingList'}
                                                   optionIcon   = {'shopping-basket'}
                                                   clickHandler = {this.optionCardClickHandler}/></div>
      </div>
    );
  }

  renderComponentToDisplay = (ComponentToDisplay) => {
    return (
      <Route render = { ( props ) => (
        <div className={'content'}>
          <ComponentToDisplay {...props}/>
        </div>
      )}
      />
    );
  }

  renderAuthWarningBlock = () => {
    return (
      <div className={'content'}>
        <p className={'authWarning'}>You must be loggin in to use the service.</p>
      </div>
    );
  }

  // If user isn't loggin in show the auth warning. Otherwise show the main component or component to display.
  render()
  {
    const { component: ComponentToDisplay } = this.props;
    return ( 
        <div className='Main-container'>
              { AuthStore.user ?  (ComponentToDisplay ? this.renderComponentToDisplay(ComponentToDisplay) : this.renderChooseWindow()) 
                                  : this.renderAuthWarningBlock() }
        </div>
    )
  }
}

export default Main;