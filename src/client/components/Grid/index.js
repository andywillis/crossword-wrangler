import React from 'react';

import Square from '../Square';

import style from './style.css';

function Grid({ squares }) {
  return (
    <div className={style.grid}>
      {squares.map(square => <Square data={square} />)};
    </div>
  );
}

export default Grid;
