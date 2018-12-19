import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import Square from '../Square';
import { getDeviceDimensions } from '../../lib/device';

import style from './style.css';

class Grid extends Component {

  componentDidMount() {
    const { deviceWidth } = getDeviceDimensions();
    const width = deviceWidth <= 1024 ? '35px' : '43px';
    console.log(deviceWidth, width)
    document.documentElement.style.setProperty('--square-width', width);
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
