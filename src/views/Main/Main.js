/* library */
import React, {Component, PropTypes} from 'react';
import { Link, Route } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import { ClipLoader } from "react-spinners";

/* component */
import OptionCard from '../../components/OptionCard/OptionCard.js';

/* style */
import './Main.sass';

@inject('AuthStore')
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

  // If user isn't loggin in show the auth warning. Otherwise show the main component or component to display.
  render()
  {
    const { component: ComponentToDisplay } = this.props;
    return ( 
        // <div className='Main-container'>
        //       { this.props.AuthStore.user ? (ComponentToDisplay ? this.renderComponentToDisplay(ComponentToDisplay) 
        //          : this.renderChooseWindow()) 
        //          : this.renderAuthWarningBlock() }
        // </div>
      <div className='Main-container'>
              {
                this.props.AuthStore.isFetching ? this.renderSpinner()  
                  : (this.props.AuthStore.user ? (ComponentToDisplay ? this.renderComponentToDisplay(ComponentToDisplay) : this.renderChooseWindow())
                  : this.renderAuthWarningBlock())
              }
      </div>
    )
  }
}

export default Main;