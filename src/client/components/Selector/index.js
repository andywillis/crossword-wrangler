import React, { Component } from 'react';

import DatePicker from '../DatePicker';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

import { stripDate, getNowDate } from '../../lib/date';

import style from './style.css';

class Selector extends Component {

  constructor(props) {
    super(props);
    this.state = { type: props.type, date: props.date ? props.date : getNowDate(true) };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, value) {
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

        <ButtonGroup print={print} hide="true" handleChange={this.handleChange}>
          <Button
            type="button"
            size="tiny"
            dataType="type"
            dataName="easy"
            selected
          >Easy
          </Button>
          <Button
            type="button"
            size="tiny"
            dataType="type"
            dataName="quic"
          >Quick
          </Button>
        </ButtonGroup>

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
