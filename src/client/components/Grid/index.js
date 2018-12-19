import React from 'react';
import { dataReady } from '../../lib/utils';

import Square from '../Square';

import style from './style.css';

function Grid({ squares }) {
  return (
    <div className={style.grid}>
      {dataReady(squares) && squares.map((square, i) => {
        return <Square key={i} square={square} />;
      })}
    </div>
  );
}

export default Grid;
