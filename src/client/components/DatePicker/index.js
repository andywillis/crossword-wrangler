import React, { Component } from 'react';

import style from './style.css';

function formatDate(str) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(str).toLocaleString('en-GB', options);
}

class DatePicker extends Component {

  static stripDate(date) {
    const [year, month, day] = date.split('-');
    return `${year.substr(2, 2)}${month}${day}`;
  }

  constructor(props) {
    super(props);
    const { value, min } = props;
    this.state = { value, min };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { handleDateChange } = this.props;
    e.target.blur();
    this.setState({ value });
    handleDateChange(DatePicker.stripDate(value));
  }

  render() {

    const { value, min } = this.state;
    const { print } = this.props;

    // If we're printing the page we need to show this span
    // instead as the input never appears
    if (print) {
      return (
        <span className={style.printDate}>{formatDate(value)}</span>
      );
    }

    return (
      <input
        className={style.datePicker}
        type="date"
        min={min}
        value={value}
        onChange={this.handleChange}
      />
    );

  }

}

export default DatePicker;
