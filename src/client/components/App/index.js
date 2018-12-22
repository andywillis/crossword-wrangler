import React, { Component } from 'react';
import compileClasses from 'classnames';

import { getNowDate } from '../../lib/date';
import { dataReady } from '../../lib/utils';
import { getDeviceDimensions } from '../../lib/device';

import Selector from '../Selector';
import Crossword from '../Crossword';
import Heading from '../Common/Heading';
import Spinner from '../Spinner';

import style from './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { crossword: {}, print: false, date: null, loading: false };
    this.handleBeforePrint = this.handleBeforePrint.bind(this);
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
    this.handleCrosswordChange = this.handleCrosswordChange.bind(this);
  }

  async componentDidMount() {
    const { deviceWidth } = getDeviceDimensions();
    const date = getNowDate(true);
    this.deviceWidth = deviceWidth;
    window.onbeforeprint = this.handleBeforePrint;
    window.onafterprint = this.handleAfterPrint;
    this.fetchData('easy', date);
  }

  async fetchData(type, date) {
    this.setState({ loading: true });
    // const res = await fetch(`/crossword/${type}/181212`);
    const res = await fetch(`/crossword/${type}/${date}`);
    const [err, crossword] = await res.json();
    if (err) {
      console.error(err);
    } else {
      this.setState({ crossword });
      this.setState({ loading: false });  
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
    const { crossword, print, loading, date } = this.state;
    const { width, height, clues, squares } = crossword;

    const loaderClass = compileClasses(style.loader, style.loading);

    return (
      <div className={style.app}>
        <Heading level="h2">
          ES Crossword&nbsp;&mdash;&nbsp;
          <Selector date={date} handleCrosswordChange={this.handleCrosswordChange} />
          {loading && <div className={loaderClass}>&#1422;</div>}
        </Heading>
        {dataReady(crossword) && (
          <Crossword
            width={width}
            height={height}
            deviceWidth={this.deviceWidth}
            print={print}
            clues={clues}
            squares={squares}
          />
        )}
      </div>
    );
  }
}

export default App;
