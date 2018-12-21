import React, { Component } from 'react';
import compileClasses from 'classnames';

import { dataReady } from '../../lib/utils';
import { getDeviceDimensions } from '../../lib/device';

import Crossword from '../Crossword';
import Heading from '../Common/Heading';
import DatePicker from '../DatePicker';
import Spinner from '../Spinner';

import style from './style.css';

function getNowDate(delimiter) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const now = new Date().toLocaleString('en-GB', options);
  const re = /(\d{2})\/(\d{2})\/(\d{4})/g;
  return now.replace(re, (all, d, m, y) => {
    const year = delimiter ? y : y.substr(2, 2);
    return delimiter ? `${year}-${m}-${d}` : `${year}${m}${d}`;
  });
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { crossword: {}, print: false, loading: false };
    this.nodes = {};
    this.handleBeforePrint = this.handleBeforePrint.bind(this);
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setNode = this.setNode.bind(this);
  }

  async componentDidMount() {
    const { deviceWidth } = getDeviceDimensions();
    this.deviceWidth = deviceWidth;
    window.onbeforeprint = this.handleBeforePrint;
    window.onafterprint = this.handleAfterPrint;
    this.fetchData(getNowDate(false));
  }

  setNode(node) {
    const { props: { 'data-type': type } } = node;
    this.nodes[type] = node;
  }

  async fetchData(date) {
    this.setState({ loading: true });
    const res = await fetch(`/crossword/easy/${date}`);
    const crossword = await res.json();
    this.setState({ crossword });
    this.setState({ loading: false });
  }

  handleDateChange(date) {
    this.fetchData(date);
  }

  handleBeforePrint() {
    this.setState({ print: true });
  }

  handleAfterPrint() {
    this.setState({ print: false });
  }

  render() {
    const { crossword, print, loading } = this.state;
    const { clues, squares } = crossword;
    if (dataReady(crossword)) {
      return (
        <div className={style.app}>
          <Heading level="h2">
            Easy Crossword&nbsp;&mdash;&nbsp;
            <DatePicker
              deviceWidth={this.deviceWidth}
              print={print}
              min="2016-05-23"
              value={getNowDate(true)}
              handleDateChange={this.handleDateChange}
            />
            {loading && <div className={compileClasses(style.loader, style.loading)}>Loading</div>}
          </Heading>
          <Crossword
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
