/* library */
import React, {Component} from 'react';
import DatePicker from "react-datepicker";
 
/* style */
import './DatePickerPanel.sass';
import "react-datepicker/dist/react-datepicker.css";

class DatePickerPanel extends Component
{
  render()
  {
    return (
      <DatePicker
        selected={this.props.selectedDate}
        onChange={this.props.dateChangeHandler}
        dateFormatCalendar={"MMM yyyy"}
        showMonthDropdown
        useShortMonthInDropdown/>
    )
  }
}

export default DatePickerPanel;