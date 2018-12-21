import React from 'react';
import { dataReady } from '../../lib/utils';

import Square from '../Square';

import style from './style.css';

function calcWidth(print, deviceWidth, noOfSquares) {
  let width;
  if (noOfSquares === '13') {
    width = deviceWidth <= 1024 ? 38 : 50;
    const minus = deviceWidth <= 1024 ? 2 : 14;
    width = print ? width - minus : width;
  }
  if (noOfSquares === '19') {
    width = deviceWidth <= 1024 ? 27 : 34;
    const minus = deviceWidth <= 1024 ? 1 : 9;
    width = print ? width - minus : width;
  }
  return width;
}

function Grid({ width: noOfSquares, squares, print, deviceWidth }) {

  let squareWidth;

  if (dataReady(squares)) {
    squareWidth = calcWidth(print, deviceWidth, noOfSquares);
    document.documentElement.style.setProperty('--square-width', `${squareWidth}px`);
    document.documentElement.style.setProperty('--grid-noOfSquares', noOfSquares);
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
