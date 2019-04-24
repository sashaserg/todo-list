import React, {Component, PropTypes} from 'react';
import './NotFound.sass';
import { Link, Route } from "react-router-dom";

class NotFound extends Component
{
  render()
  {
    const { component: ComponentToDisplay } = this.props;
    return (
        <div className='NotFound-container'>
            <p>Page not found :(</p>
        </div>
    )
  }
}

export default NotFound;