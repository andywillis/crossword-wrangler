import React from 'react';

import { formatDate } from '../../lib/date';

import style from './style.css';

function DatePicker({ value, min, dataType, print, handleChange }) {

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
      onChange={handleChange}
    />
  );

}

export default DatePicker;
