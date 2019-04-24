import React, {Component, PropTypes} from 'react';
import './Main.sass';
import { Link, Route } from "react-router-dom";
import OptionCard from '../../components/OptionCard/OptionCard.js'

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

  render()
  {
    const { component: ComponentToDisplay } = this.props;
    return (
        <div className='Main-container'>
              { ComponentToDisplay ? this.renderComponentToDisplay(ComponentToDisplay) : this.renderChooseWindow() }
        </div>
    )
  }
}

export default Main;