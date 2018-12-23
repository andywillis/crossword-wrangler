import React, { Component } from 'react';

import { formatDate } from '../../lib/date';

import style from './style.css';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { dataset: { type }, value } = e.target;
    const { handleChange } = this.props;
    e.target.blur();
    handleChange(type, value);
  }

  render() {
    const { value, min, dataType, print } = this.props;

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
        data-type={dataType}
        min={min}
        value={value}
        onChange={this.handleChange}
      />
    );
  }

}

export default DatePicker;
