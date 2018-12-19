import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import Crossword from '../Crossword';
import Heading from '../Common/Heading';

import style from './style.css';

function formatDate(str) {
  const re = /(\d{2})(\d{2})(\d{2})/g;
  const f = str.replace(re, (all, d1, d2, d3) => `20${d1}-${d2}-${d3}`);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(f).toLocaleString('en-GB', options);
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { crossword: {} };
  }

  async componentDidMount() {
    const res = await fetch('/crossword/sample/180101');
    const crossword = await res.json();
    this.setState({ crossword });
  }

  render() {
    const { crossword } = this.state;
    const { clues, squares } = crossword;
    return (
      <div className={style.app}>
        <Heading level="h2">Easy Crossword - {formatDate('180101')}</Heading>
        {dataReady(crossword) && <Crossword clues={clues} squares={squares} />}
        <footer>&copy; Andy Willis</footer>
      </div>
    );
  }
}

export default App;
