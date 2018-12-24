import React, { Component } from 'react';
import compileClasses from 'classnames';

import { getNowDate, isAWeekDay } from '../../lib/date';
import { dataReady } from '../../lib/utils';
import { getDeviceDimensions } from '../../lib/device';

import Selector from '../Selector';
import Crossword from '../Crossword';
import Heading from '../Common/Heading';

import style from './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { crossword: {}, print: false, date: null, type: 'easy', loading: false };
    this.handleBeforePrint = this.handleBeforePrint.bind(this);
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
    this.handleCrosswordChange = this.handleCrosswordChange.bind(this);
  }

  async componentDidMount() {
    const { deviceWidth } = getDeviceDimensions();
    const date = getNowDate();
    this.deviceWidth = deviceWidth;
    window.addEventListener('beforeprint', this.handleBeforePrint, false);
    window.addEventListener('afterprint', this.handleAfterPrint, false);
    this.fetchData('easy', date);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeprint', this.handleBeforePrint);
    window.removeEventListener('afterprint', this.handleAfterPrint);
  }

  getBody() {
    const { crossword, print } = this.state;
    if (dataReady(crossword)) {
      const { width, height, clues, squares } = crossword;
      return (
        <Crossword
          width={width}
          height={height}
          deviceWidth={this.deviceWidth}
          print={print}
          clues={clues}
          squares={squares}
        />
      );
    }
    return <div>No crossword available for this date.</div>;
  }

  async fetchData(type, date) {
    if (isAWeekDay(date)) {
      this.setState({ loading: true });
      const res = await fetch(`/crossword/${type}/${date}`);
      const [err, crossword] = await res.json();
      if (err) {
        console.error(err);
        this.setState({ crossword: null });
      } else {
        this.setState({ type, crossword, date, loading: false });
      }
    } else {
      this.setState({ crossword: null });
    }
  }

  handleCrosswordChange(type, date) {
    this.fetchData(type, date);
  }

  handleBeforePrint() {
    this.setState({ print: true });
  }

  handleAfterPrint() {
    this.setState({ print: false });
  }

  render() {

    const { print, loading, date, type } = this.state;
    const loaderClass = compileClasses(style.loader, style.loading);

    return (
      <div className={style.app}>
        <Heading level="h2">
          ES Crossword&nbsp;&mdash;&nbsp;
          <Selector
            type={type}
            date={date}
            print={print}
            handleCrosswordChange={this.handleCrosswordChange}
          />
          {loading && <div className={loaderClass}>&#1422;</div>}
        </Heading>
        {this.getBody()}
      </div>
    );

  }
}

export default App;
