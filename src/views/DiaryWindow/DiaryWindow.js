/* library */
import React, {Component, PropTypes} from 'react';

/* style */
import './DiaryWindow.sass';

/* component */
import DatePickerPanel from "../../components/DatePickerPanel/DatePickerPanel.js";
import DiaryNote from '../../components/DiaryNote/DiaryNote.js';

class DiaryWindow extends Component
{
  render() {
    return (
        <div className='DiaryWindow-container'>
            <DatePickerPanel/>
        </div>
    )
  }
}

export default DiaryWindow;