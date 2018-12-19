import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import Square from '../Square';

import style from './style.css';

class Grid extends Component {

  static calcWidth(print, deviceWidth) {
    let width = deviceWidth <= 1024 ? 38 : 50;
    const minus = deviceWidth <= 1024 ? 2 : 14;
    width = print ? width - minus : width;
    return width;
  }

  constructor(props) {
    super(props);
    this.setWidth = this.setWidth.bind(this);
  }

  componentDidMount() {
    this.setWidth();
  }

  componentDidUpdate() {
    this.setWidth();
  }

  setWidth() {
    const { print, deviceWidth } = this.props;
    const width = Grid.calcWidth(print, deviceWidth);
    document.documentElement.style.setProperty('--square-width', `${width}px`);
  }

  render() {
    const { squares } = this.props;
    return (
      <div className={style.wrapper}>
        <div className={style.grid}>
          {dataReady(squares) && squares.map((square, i) => {
            return <Square key={i} square={square} />;
          })}
        </div>
      </div>
    );
  }

}

export default Grid;
