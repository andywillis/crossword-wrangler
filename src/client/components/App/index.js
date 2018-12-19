import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import Crossword from '../Crossword';
import Heading from '../Common/Heading';
import DatePicker from '../DatePicker';

import style from './style.css';

function getNowDate() {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const now = new Date().toLocaleString('en-GB', options);
  const re = /(\d{2})\/(\d{2})\/(\d{4})/g;
  return now.replace(re, (all, d, m, y) => {
    return `${y}-${m}-${d}`;
  });
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { crossword: {}, print: false };
    this.nodes = {};
    this.handleBeforePrint = this.handleBeforePrint.bind(this);
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
    this.setNode = this.setNode.bind(this);
  }

  async componentDidMount() {
    const res = await fetch('/crossword/sample/180101');
    const crossword = await res.json();
    this.setState({ crossword });
    window.onbeforeprint = this.handleBeforePrint;
    window.onafterprint = this.handleAfterPrint;
  }
  
  setNode(node) {
    const { props: { 'data-type': type } } = node;
    this.nodes[type] = node;
  }

  handleBeforePrint() {
    this.setState({ print: true });
  }
  
  handleAfterPrint() {
    this.setState({ print: false });
  }

  render() {
    const { crossword, print } = this.state;
    const { clues, squares } = crossword;
    return (
      <div className={style.app}>
        <Heading level="h2">
          Easy Crossword&nbsp;&mdash;&nbsp;
          <DatePicker print={print} min="2016-05-23" value={getNowDate()} />
        </Heading>
        {dataReady(crossword) && <Crossword clues={clues} squares={squares} />}
      </div>
    );
  }
}

export default App;
