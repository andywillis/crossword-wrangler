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
    this.state = { crossword: {}, print: false, loading: false };
    this.handleBeforePrint = this.handleBeforePrint.bind(this);
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
    this.handleCrosswordChange = this.handleCrosswordChange.bind(this);
  }

  async componentDidMount() {
    const { deviceWidth } = getDeviceDimensions();
    this.deviceWidth = deviceWidth;
    window.onbeforeprint = this.handleBeforePrint;
    window.onafterprint = this.handleAfterPrint;
    this.fetchData('easy', getNowDate(false));
  }

  async fetchData(type, date) {
    this.setState({ loading: true });
    const res = await fetch(`/crossword/${type}/${date}`);
    const crossword = await res.json();
    this.setState({ crossword });
    this.setState({ loading: false });
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
    const { crossword, print, loading } = this.state;
    const { width, height, clues, squares } = crossword;

    const loaderClass = compileClasses(style.loader, style.loading);

    if (dataReady(crossword)) {
      return (
        <div className={style.app}>
          <Heading level="h2">
            ES Crossword&nbsp;&mdash;&nbsp;
            <Selector handleCrosswordChange={this.handleCrosswordChange} />
            {loading && <div className={loaderClass}>&#1422;</div>}
          </Heading>
          <Crossword
            width={width}
            height={height}
            deviceWidth={this.deviceWidth}
            print={print}
            clues={clues}
            squares={squares}
          />
        </div>
      );
    }
    return <Spinner />;
  }
}

export default App;
