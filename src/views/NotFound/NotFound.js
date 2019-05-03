/* library */
import React, {Component, PropTypes} from 'react';

/* style */
import './NotFound.sass';

class NotFound extends Component
{
  render() {
    const { component: ComponentToDisplay } = this.props;
    return (
        <div className='NotFound-container'>
            <p>Page not found :(</p>
        </div>
    )
  }
}

export default NotFound;