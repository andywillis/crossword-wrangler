import React, { Component } from 'react';

import DatePicker from '../DatePicker';

import { stripDate } from '../../lib/date';

import style from './style.css';

class Selector extends Component {

  constructor(props) {
    super(props);
    this.state = { type: 'easy', date: props.date };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { dataset: { type }, value } = e.target;
    this.setState({ [type]: value }, () => {
      const { handleCrosswordChange } = this.props;
      const { type, date } = this.state;
      handleCrosswordChange(type, stripDate(date));
    });
  }

  render() {
    const { deviceWidth, print } = this.props;
    const { /* type, */ date } = this.state;
    return (
      <div className={style.selector}>

        <DatePicker
          deviceWidth={deviceWidth}
          print={print}
          min="2016-05-23"
          value={date}
          dataType="date"
          handleChange={this.handleChange}
        />
      </div>
    );
  }

}

export default Selector;
