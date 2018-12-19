import React from 'react';
import { dataReady } from '../../lib/utils';

import Square from '../Square';

import style from './style.css';

function calcWidth(print, deviceWidth) {
  let width = deviceWidth <= 1024 ? 38 : 50;
  const minus = deviceWidth <= 1024 ? 2 : 14;
  width = print ? width - minus : width;
  return width;
}

function Grid({ squares, print, deviceWidth }) {

  let width;

  if (dataReady(squares)) {
    width = calcWidth(print, deviceWidth);
    document.documentElement.style.setProperty('--square-width', `${width}px`);
  }

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

export default Grid;
